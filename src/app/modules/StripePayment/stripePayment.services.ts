import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StripePayment } from './stripePayment.modal';
import { priceIds } from './stripePayment.constant';
import { User } from '../User/user.model';
import moment from 'moment';
import MembershipPayment from '../MembershipPayment/membershipPayment.model';
import {
  sendMembershipChangeConfirmationEmail,
  sendMembershipPurchasedConfirmationEmail,
  sendMembershipRenewFailedNotifyEmail,
  sendMembershipRenewSuccessNotifyEmail,
} from '../../utils/email';
import { sendSms } from '../../utils/sendSms';

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

const createOrUpdateMembershipSubscription = async (payload: {
  email: string;
  plan: 'monthly' | 'yearly';
  membership: keyof typeof priceIds;
}) => {
  const { email, membership, plan } = payload;

  const priceId = priceIds[membership]?.[plan];
  if (!priceId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid membership type or plan',
    );
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

      user.subscription_plan = plan;
      user.subscription = membership;
      await user.save();

      return {
        requiresPayment: paymentIntent?.status !== 'succeeded',
        clientSecret: paymentIntent?.client_secret,
      };
    }
  }

  const subscription = await stripe.subscriptions.create({
    customer: user.customer_id,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  const paymentIntent = subscription.latest_invoice?.payment_intent;

  user.subscription_id = subscription.id;
  user.subscription_plan = plan;
  user.subscription = membership;
  await user.save();

  return {
    requiresPayment: paymentIntent?.status !== 'succeeded',
    clientSecret: paymentIntent?.client_secret,
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

    const issueDate = moment().toISOString();
    const expiryDate =
      customer.subscription_plan === 'monthly'
        ? moment().add(1, 'month').toISOString()
        : moment().add(1, 'year').toISOString();

    await User.findOneAndUpdate(
      { email: customer.email },
      {
        membership: true,
        status: true,
        plan: customer.subscription_plan,
        package_name: customer.subscription.split('_').join(' '),
        issue_date: issueDate,
        expiry_date: expiryDate,
      },
    );

    if (invoice.billing_reason === 'subscription_create') {
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
    } else {
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

  if (
    event.type === 'customer.subscription.updated' &&
    event.data.previous_attributes?.items
  ) {
    const subscription = event.data.object;
    const customer = await StripePayment.findOne({
      customer_id: subscription.customer,
    });

    if (!customer) {
      console.error(
        '❌ Customer not found for subscription update',
        subscription.customer,
      );
      return { statusCode: 200 };
    }

    await User.findOneAndUpdate(
      { email: customer.email },
      {
        membership: true,
        status: true,
        plan: customer.subscription_plan,
        package_name: customer.subscription.split('_').join(' '),
      },
    );

    await sendMembershipChangeConfirmationEmail({
      email: customer.email,
      invoiceId: subscription.latest_invoice,
      amount: 0,
      subscription: customer.subscription.split('_').join(' '),
      subscription_plan: customer.subscription_plan,
    });

    await sendSms({
      email: customer.email,
      message: `Your subscription for ${customer.subscription.split('_').join(' ')} has been successfully created. Enjoy your membership!`,
    });

    console.log(`✅ Subscription updated for ${customer.email}`);

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

    const issueDate = moment().toISOString();
    const expiryDate =
      customer.subscription_plan === 'monthly'
        ? moment().add(1, 'month').toISOString()
        : moment().add(1, 'year').toISOString();

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
      amount: invoice.amount_paid / 100,
      subscription: customer.subscription.split('_').join(' '),
      subscription_plan: customer.subscription_plan,
      issue_date: issueDate,
      expiry_date: expiryDate,
    });

    await sendSms({
      email: customer.email,
      message: `Your subscription for ${customer.subscription.split('_').join(' ')} has failed to renew. Please check your payment details or contact support for assistance.`,
    });

    console.log(`❌ Payment failed for ${customer.email}`);
    return { statusCode: 200 };
  }

  console.log(`⚠️ Unhandled event type: ${event.type}`);
  return { statusCode: 200 };
};

export const StripePaymentServices = {
  createPaymentIntent,
  createOrUpdateMembershipSubscription,
  reCurringProccess,
};
