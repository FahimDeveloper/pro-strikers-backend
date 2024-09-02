import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const stripePaymentIntent = catchAsync(async (req, res) => {
  const amount = Math.round(req.body.amount * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(httpStatus.OK).json({
    clientSecret: paymentIntent.client_secret,
  });
});

export const StripePaymentController = {
  stripePaymentIntent,
};
