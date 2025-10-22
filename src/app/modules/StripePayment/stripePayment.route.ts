import express from 'express';
import { StripePaymentControllers } from './stripePayment.controllers';

const route = express.Router();

route.post(
  '/create-payment-intent',
  StripePaymentControllers.createPaymentIntent,
);

route.post(
  '/create-subscription',
  StripePaymentControllers.createOrUpdateMembershipSubscription,
);

route.post(
  '/create-custom-subscription',
  StripePaymentControllers.createCustomSubscription,
);

export const StripePaymentRoutes = route;
