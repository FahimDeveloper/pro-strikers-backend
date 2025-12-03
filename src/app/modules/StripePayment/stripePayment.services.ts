import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StripePayment } from './stripePayment.modal';
import {
  getQuarterlyCouponId,
  getPriceId,
  membershipsCredits,
  getMonthlyCouponId,
} from './stripePayment.constant';
import { User } from '../User/user.model';
import moment from 'moment';
import MembershipPayment from '../MembershipPayment/membershipPayment.model';
import {
  sendClientAccountConfirmationEmail,
  sendMembershipChangeConfirmationEmail,
  sendMembershipPurchasedConfirmationEmail,
  sendMembershipRenewFailedNotifyEmail,
  sendMembershipRenewSuccessNotifyEmail,
  sendTeamMembershipNotificationEmail,
} from '../../utils/email';
import { sendSms } from '../../utils/sendSms';
import { Types } from 'mongoose';
import { CustomMembership } from '../CustomMembership/customMembership.model';
import { TeamMembership } from '../TeamMembership/teamMembership.model';
import { generateRandomPassword } from '../../utils/generateRandomPassword';
import Stripe from 'stripe';

const sk_key = config.stripe_sk_key;
const stripe = require('stripe')(sk_key);

const createPaymentIntent = async (price: number) => {
  const amount = Math.round(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'always',
    },
  });
  return {
    clientSecret: paymentIntent.client_secret,
    transection_id: paymentIntent.id,
  };
};

const createCustomMembershipSubscription = async (payload: {
  email: string;
  membership: Types.ObjectId;
  team: Types.ObjectId;
}) => {
  const { email, membership, team } = payload;

  const membershipData = await CustomMembership.findById(membership).lean();
  if (!membershipData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Membership not found');
  }
  let user = await StripePayment.findOne({ email });

  if (!user) {
    const stripeCustomer = await stripe.customers.create({ email });
    user = await StripePayment.create({
      email,
      customer_id: stripeCustomer.id,
    });
  }

  if (user.subscription_id) {
    const existingSubscription = await stripe.subscriptions.retrieve(
      user.subscription_id,
    );

    if (existingSubscription.status === 'active') {
      const subscriptionItemId = existingSubscription.items.data[0]?.id;
      const currentPriceId = existingSubscription.items.data[0]?.price.id;

      if (currentPriceId === membershipData?.price_id) {
        return {
          message: 'You and your team already have this membership active.',
          requiresPayment: false,
        };
      }

      const updatedSubscription = await stripe.subscriptions.update(
        user.subscription_id,
        {
          items: [{ id: subscriptionItemId, price: membershipData.price_id }],
          proration_behavior: 'create_prorations',
          billing_cycle_anchor: 'now',
          metadata: {
            team: team,
            membership: membership,
            email: email,
          },
        },
      );

      const invoice = await stripe.invoices.retrieve(
        updatedSubscription.latest_invoice as string,
      );

      if (invoice.amount_due > 0 && invoice.status === 'open') {
        await stripe.invoices.pay(invoice.id);
      }

      const refreshedInvoice = await stripe.invoices.retrieve(invoice.id, {
        expand: ['payment_intent'],
      });

      const paymentIntent = refreshedInvoice.payment_intent;

      user.subscription_plan = membershipData.billing_cycle;
      user.subscription = membershipData.name;
      await user.save();

      return {
        requiresPayment: paymentIntent?.status !== 'succeeded',
        clientSecret: paymentIntent?.client_secret,
      };
    }
  }

  const subscription = await stripe.subscriptions.create({
    customer: user.customer_id,
    items: [{ price: membershipData.price_id }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      team: team,
    },
  });

  const paymentIntent = subscription.latest_invoice?.payment_intent;
  user.subscription_id = subscription.id;
  user.subscription_plan =
    membershipData.billing_cycle === 'month' ? 'monthly' : 'yearly';
  user.subscription = membershipData.name;
  await user.save();

  return {
    requiresPayment: paymentIntent?.status !== 'succeeded',
    clientSecret: paymentIntent?.client_secret,
  };
};

export const createOrUpdateMembershipSubscription = async (payload: {
  email: string;
  plan: 'monthly' | 'quarterly';
  membership: 'individual_pro' | 'individual_pro_unlimited';
  amount?: number;
  isBlackFriday?: boolean;
}) => {
  const { email, membership, plan, amount, isBlackFriday = false } = payload;

  const priceId = getPriceId(membership, plan);
  if (!priceId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid membership type or plan',
    );
  }

  const couponId = isBlackFriday ? getQuarterlyCouponId(membership) : undefined;

  let user = await StripePayment.findOne({ email });

  if (!user) {
    const stripeCustomer = await stripe.customers.create({ email });
    user = await StripePayment.create({
      email,
      customer_id: stripeCustomer.id,
    });
  }

  // ---------------- Existing subscription handling ----------------
  if (user.subscription_id) {
    const existingSubscription = await stripe.subscriptions.retrieve(
      user.subscription_id,
      { expand: ['latest_invoice.payment_intent'] },
    );

    if (amount && amount > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        customer: user.customer_id,
        amount: amount * 100,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
      });

      return {
        requiresPayment: true,
        clientSecret: paymentIntent.client_secret,
      };
    }

    if (existingSubscription.status === 'active') {
      const subscriptionItemId = existingSubscription.items.data[0]?.id;
      const currentPriceId = existingSubscription.items.data[0]?.price.id;

      if (currentPriceId === priceId) {
        return {
          message: 'You already have this membership active.',
          requiresPayment: false,
          transaction_id: user.subscription_id,
        };
      }

      const updatedSubscription = await stripe.subscriptions.update(
        user.subscription_id,
        {
          items: [{ id: subscriptionItemId, price: priceId }],
          proration_behavior: 'create_prorations',
          billing_cycle_anchor: 'now',
          expand: ['latest_invoice.payment_intent'],
        },
      );

      const invoice = updatedSubscription.latest_invoice as Stripe.Invoice;
      let paymentIntent: Stripe.PaymentIntent | null = null;
      let requiresPayment = false;

      if (invoice?.payment_intent) {
        paymentIntent =
          typeof invoice.payment_intent === 'string'
            ? await stripe.paymentIntents.retrieve(invoice.payment_intent)
            : (invoice.payment_intent as Stripe.PaymentIntent);

        if (invoice.amount_due > 0 && invoice.status === 'open') {
          await stripe.invoices.pay(invoice.id);
        }

        requiresPayment = paymentIntent?.status !== 'succeeded';
      }

      user.subscription_plan = plan;
      user.subscription = membership;
      await user.save();

      return {
        requiresPayment,
        clientSecret: paymentIntent?.client_secret || null,
      };
    }
  }

  // ---------------- New subscription ----------------
  const subscription = await stripe.subscriptions.create({
    customer: user.customer_id,
    items: [{ price: priceId }],
    discounts: couponId ? [{ coupon: couponId }] : [],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  const invoice = subscription.latest_invoice as Stripe.Invoice;

  let paymentIntent: Stripe.PaymentIntent | null = null;
  let requiresPayment = false;

  if (invoice?.payment_intent) {
    paymentIntent =
      typeof invoice.payment_intent === 'string'
        ? await stripe.paymentIntents.retrieve(invoice.payment_intent)
        : (invoice.payment_intent as Stripe.PaymentIntent);

    requiresPayment = paymentIntent?.status !== 'succeeded';
  }

  user.subscription_id = subscription.id;
  user.subscription_plan = plan;
  user.subscription = membership;
  await user.save();

  return {
    requiresPayment,
    clientSecret: paymentIntent?.client_secret || null,
  };
};

export const reCurringProccess = async (body: Buffer, headers: any) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error('🚨 Webhook signature failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;

    const paymentIntentId = invoice.payment_intent;
    const customerId = invoice.customer;

    const customer = await StripePayment.findOne({
      customer_id: customerId,
    });

    if (!customer) {
      console.error('❌ Customer not found for recurring payment', customerId);
      return { statusCode: 200 };
    }

    if (invoice.billing_reason === 'subscription_create' && paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string,
      );

      if (paymentIntent.payment_method) {
        await stripe.customers.update(customerId as string, {
          invoice_settings: {
            default_payment_method: paymentIntent.payment_method as string,
          },
        });
      }
    }

    await MembershipPayment.create({
      transaction_id: invoice.id,
      amount: invoice.amount_paid / 100,
      email: customer.email,
    });

    const issueDate = moment(invoice.period_start * 1000).toISOString();
    const expiryDate =
      customer.subscription_plan === 'monthly'
        ? moment().add(1, 'month').toISOString()
        : customer.subscription_plan === 'quarterly'
          ? moment().add(4, 'months').toISOString()
          : moment().add(1, 'year').toISOString();

    const membershipCredit =
      membershipsCredits[
        customer.subscription as keyof typeof membershipsCredits
      ];
    const user = await User.findOne({ email: customer.email }).lean();
    if (
      user?.credit_balance &&
      user?.credit_balance?.session_credit !== 'unlimited' &&
      membershipCredit.session_credit !== 'unlimited'
    ) {
      await User.findOneAndUpdate(
        { email: customer.email },
        {
          membership: true,
          status: true,
          plan: customer.subscription_plan,
          package_name: customer.subscription.split('_').join(' '),
          issue_date: issueDate,
          expiry_date: expiryDate,
          credit_balance: {
            session_credit:
              Number(membershipCredit.session_credit) +
              Number(user.credit_balance.session_credit),
            machine_credit:
              Number(membershipCredit.machine_credit) +
              Number(user.credit_balance.machine_credit || '0'),
          },
        },
      );
    } else {
      await User.findOneAndUpdate(
        { email: customer.email },
        {
          membership: true,
          status: true,
          plan: customer.subscription_plan,
          package_name: customer.subscription.split('_').join(' '),
          issue_date: issueDate,
          expiry_date: expiryDate,
          credit_balance: membershipCredit,
        },
      );
    }
    if (invoice.billing_reason === 'subscription_create') {
      const subscriptionId =
        invoice.subscription ??
        invoice.parent?.subscription_details?.subscription ??
        invoice.lines?.data?.[0]?.parent?.subscription_item_details
          ?.subscription;
      const subscription = await stripe.subscriptions.retrieve(
        subscriptionId as string,
      );
      const teamId = subscription.metadata?.team;
      if (teamId) {
        const teamMembership = await TeamMembership.findByIdAndUpdate(
          teamId,
          {
            status: true,
            issue_date: issueDate,
            expiry_date: expiryDate,
          },
          { new: true },
        ).lean();
        const members = teamMembership?.team.filter(
          member => member.role === 'member',
        );
        if (members?.length) {
          for (const member of members) {
            const existingUser = await User.isUserExistsByEmail(member.email);

            let password: string | null = null;

            if (!existingUser) {
              password = generateRandomPassword();

              await User.create({
                email: member.email,
                password,
                provider: 'email with password',
                verified: true,
                membership: true,
                status: true,
                issue_date: issueDate,
                expiry_date: expiryDate,
                package_name: customer.subscription,
                plan: customer.subscription_plan,
              });
              await sendClientAccountConfirmationEmail({
                email: member.email,
                password,
              });
            } else {
              await User.findByIdAndUpdate(existingUser._id, {
                membership: true,
                status: true,
                issue_date: issueDate,
                expiry_date: expiryDate,
                package_name: customer.subscription,
                plan: customer.subscription_plan,
              });
            }

            await sendTeamMembershipNotificationEmail({
              team_name: teamMembership?.team_name!,
              email: member.email,
              team: teamMembership?.team!,
            });
          }
        }
      }
      await sendMembershipPurchasedConfirmationEmail({
        email: customer.email,
        invoiceId: invoice.id,
        amount: invoice.amount_paid / 100,
        subscription: customer.subscription.split('_').join(' '),
        subscription_plan: customer.subscription_plan,
        issue_date: issueDate,
        expiry_date: expiryDate,
      });
      await sendSms({
        email: customer.email,
        message: `Your subscription for ${customer.subscription.split('_').join(' ')} has been successfully created. Enjoy your membership!`,
      });
    }

    if (invoice.billing_reason === 'subscription_update') {
      await sendMembershipChangeConfirmationEmail({
        email: customer.email,
        invoiceId: invoice.id,
        amount: invoice.amount_paid / 100,
        subscription: customer.subscription.split('_').join(' '),
        subscription_plan: customer.subscription_plan,
        issue_date: issueDate,
        expiry_date: expiryDate,
      });
      await sendSms({
        email: customer.email,
        message: `Your subscription for ${customer.subscription.split('_').join(' ')} has been successfully updated. Enjoy your membership!`,
      });
    }

    if (invoice.billing_reason === 'subscription_cycle') {
      const subscriptionId = invoice.subscription;
      const subscription = await stripe.subscriptions.retrieve(
        subscriptionId as string,
      );
      const teamId = subscription.metadata?.team;
      if (teamId) {
        const teamMembership = await TeamMembership.findById(teamId).lean();
        const members = teamMembership?.team.filter(
          member => member.role === 'member',
        );
        if (members?.length) {
          for (const member of members) {
            const existingUser = await User.isUserExistsByEmail(member.email);
            if (!existingUser) {
              return;
            }
            await User.findByIdAndUpdate(existingUser._id, {
              membership: true,
              status: true,
              issue_date: issueDate,
              expiry_date: expiryDate,
              package_name: customer.subscription,
              plan: customer.subscription_plan,
            });
          }
        }
      }
      await sendMembershipRenewSuccessNotifyEmail({
        email: customer.email,
        invoiceId: invoice.id,
        amount: invoice.amount_paid / 100,
        subscription: customer.subscription.split('_').join(' '),
        subscription_plan: customer.subscription_plan,
        issue_date: issueDate,
        expiry_date: expiryDate,
      });
      await sendSms({
        email: customer.email,
        message: `Your subscription for ${customer.subscription.split('_').join(' ')} has been successfully renewed. Enjoy your membership!`,
      });
    }
    return { statusCode: 200 };
  }

  if (event.type === 'invoice.upcoming') {
    const invoice = event.data.object;
    const customerId = invoice.customer;

    const customer = await StripePayment.findOne({
      customer_id: customerId,
    });

    if (!customer) {
      new AppError(httpStatus.NOT_FOUND, 'Customer not found');
    }

    const couponId = getMonthlyCouponId(customer?.subscription!);

    const cycleNumber = invoice.subscription_details?.cycle_number || 1;

    if (cycleNumber === 2) {
      await stripe.invoices.update(invoice.id, {
        discounts: [{ coupon: couponId }],
      });
    }

    return { statusCode: 200 };
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object;
    const customer = await StripePayment.findOne({
      customer_id: invoice.customer,
    });

    if (!customer) {
      console.error(
        '❌ Customer not found for failed payment',
        invoice.customer,
      );
      return { statusCode: 200 };
    }

    await User.findOneAndUpdate(
      { email: customer.email },
      {
        membership: true,
        status: false,
        plan: customer.subscription_plan,
        package_name: customer.subscription.split('_').join(' '),
      },
    );

    await sendMembershipRenewFailedNotifyEmail({
      email: customer.email,
      invoiceId: invoice.id,
      amount: invoice.amount_due / 100,
      subscription: customer.subscription.split('_').join(' '),
      subscription_plan: customer.subscription_plan,
    });

    await sendSms({
      email: customer.email,
      message: `Your subscription for ${customer.subscription.split('_').join(' ')} has failed to renew. Please check your email for more information. Contact support for assistance.`,
    });

    console.log(`❌ Payment failed for ${customer.email}`);
    return { statusCode: 200 };
  }

  console.log(`⚠️ Unhandled event type: ${event.type}`);
  return { statusCode: 200 };
};

export const StripePaymentServices = {
  createPaymentIntent,
  createCustomMembershipSubscription,
  createOrUpdateMembershipSubscription,
  reCurringProccess,
};
