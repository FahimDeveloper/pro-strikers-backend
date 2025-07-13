import express from 'express';
import { StripePaymentControllers } from './stripePayment.controllers';

const route = express.Router();

route.post(
  '/create-payment-intent',
  StripePaymentControllers.createPaymentIntent,
);

route.post(
  '/create-subscription',
  StripePaymentControllers.createMembershipSubscription,
);

route.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  StripePaymentControllers.stripeWebhook,
);

export const StripePaymentRoutes = route;
