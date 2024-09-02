import express from 'express';
import { StripePaymentController } from './stripePaymentController';

const route = express.Router();

route.post(
  '/create-payment-intent',
  StripePaymentController.stripePaymentIntent,
);

export const StripePaymentRoutes = route;
