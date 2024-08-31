import express from 'express';
import httpStatus from 'http-status';

const route = express.Router();

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
route.post('/create-payment-intent', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'Something went wrong',
    });
  }
});

export const PaymentRoute = route;
