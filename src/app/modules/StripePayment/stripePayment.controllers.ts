import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StripePaymentServices } from './stripePayment.services';

const createPaymentIntent = catchAsync(async (req, res) => {
  const { amount } = req.body;
  const result = await StripePaymentServices.createPaymentIntent(amount);
  sendResponse(
    res,
    httpStatus.OK,
    'Payment intent created successfully',
    result,
  );
});
const createMembershipSubscription = catchAsync(async (req, res) => {
  const result =
    await StripePaymentServices.createOrUpdateMembershipSubscription(req.body);

  sendResponse(res, httpStatus.OK, 'Setup intent created', result);
});

const stripeWebhook = catchAsync(async (req, res) => {
  console.log('Type of req.body:', typeof req.body);
  console.log('Is Buffer:', Buffer.isBuffer(req.body));
  console.log('Raw body length:', req.body.length);
  await StripePaymentServices.reCurringProccess(req.body, req.headers);
  sendResponse(res, httpStatus.OK, 'Recurring webhook call success');
});

export const StripePaymentControllers = {
  createPaymentIntent,
  createMembershipSubscription,
  stripeWebhook,
};
