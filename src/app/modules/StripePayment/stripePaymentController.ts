import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

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
  const result = {
    clientSecret: paymentIntent.client_secret,
    transection_id: paymentIntent.id,
  };
  sendResponse(
    res,
    httpStatus.OK,
    'Payment intent created successfully',
    result,
  );
});

export const StripePaymentController = {
  stripePaymentIntent,
};
