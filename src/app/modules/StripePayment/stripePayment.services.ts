import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StripePayment } from './stripePayment.modal';
import { priceIds } from './stripePayment.constant';
import { User } from '../User/user.model';
import moment from 'moment';
import MembershipPayment from '../MembershipPayment/membershipPayment.model';

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

const createMembershipSubscription = async (payload: {
  email: string;
  plan: string;
  membership: string;
}) => {
  type MembershipKey = keyof typeof priceIds;
  type PlanKey = 'monthly' | 'yearly';

  const { email, membership, plan } = payload;
  const priceId = priceIds[membership as MembershipKey]?.[plan as PlanKey];

  const user = await StripePayment.findOne({ email });
  if (!user?.customer_id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Subscription user not found');
  }
  if (!priceId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid membership type or plan',
    );
  }

  let subscription;

  if (user.subscription_id) {
    const existingSubscription = await stripe.subscriptions.retrieve(
      user.subscription_id,
    );

    const subscriptionItemId = existingSubscription.items.data[0].id;

    subscription = await stripe.subscriptions.update(user.subscription_id, {
      items: [
        {
          id: subscriptionItemId,
          price: priceId,
        },
      ],
      expand: ['latest_invoice.payment_intent'],
    });
  } else {
    subscription = await stripe.subscriptions.create({
      customer: user.customer_id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    user.subscription_id = subscription.id;
  }

  user.subcription_plan = plan;
  await user.save();

  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    transection_id: subscription.id,
  };
};

const reCurringProccess = async (body: any, headers: any) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return;
  }
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    const customer = await StripePayment.findOne({
      customer_id: invoice.customer,
    });
    if (!customer) {
      console.error('After recurring payment customer not found');
      return;
    }
    await MembershipPayment.create({
      transaction_id: invoice.id,
      amount: invoice.amount_paid / 100,
      email: customer.email,
    });
    await User.findOneAndUpdate(
      { email: customer.email },
      {
        status: true,
        expiry_date: moment(new Date()).add(1, 'month').toDate(),
      },
    );
  }
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object;
    console.error('Recurring payment failed', invoice.customer);
    return;
  }
};

export const StripePaymentServices = {
  createPaymentIntent,
  createMembershipSubscription,
  reCurringProccess,
};
