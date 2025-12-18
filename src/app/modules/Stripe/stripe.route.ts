import express from 'express';
import { StripePaymentControllers } from './stripe.controllers';

const route = express.Router();

route.post(
  '/create-payment-intent',
  StripePaymentControllers.createPaymentIntent,
);

route.post(
  '/create-general-subscription',
  StripePaymentControllers.createOrUpdateGeneralMembershipSubscription,
);

route.post(
  '/create-academy-subscription',
  StripePaymentControllers.createOrUpdateAcademyMembershipSubscription,
);

route.post(
  '/create-custom-subscription',
  StripePaymentControllers.createCustomSubscription,
);

export const StripePaymentRoutes = route;
