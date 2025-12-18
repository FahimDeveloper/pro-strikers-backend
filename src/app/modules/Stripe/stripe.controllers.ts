import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StripePaymentServices } from './stripe.services';

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
const createCustomSubscription = catchAsync(async (req, res) => {
  const result = await StripePaymentServices.createCustomMembershipSubscription(
    req.body,
  );

  sendResponse(res, httpStatus.OK, 'Setup intent created', result);
});

const createOrUpdateGeneralMembershipSubscription = catchAsync(
  async (req, res) => {
    const result =
      await StripePaymentServices.createOrUpdateGeneralMembershipSubscription(
        req.body,
      );

    sendResponse(res, httpStatus.OK, 'Setup intent created', result);
  },
);

const createOrUpdateAcademyMembershipSubscription = catchAsync(
  async (req, res) => {
    const result =
      await StripePaymentServices.createOrUpdateAcademyMembershipSubscription(
        req.body,
      );

    sendResponse(res, httpStatus.OK, 'Setup intent created', result);
  },
);

const stripeWebhook = catchAsync(async (req, res) => {
  await StripePaymentServices.reCurringProccess(req.body, req.headers);
  sendResponse(res, httpStatus.OK, 'Recurring webhook call success');
});

export const StripePaymentControllers = {
  createPaymentIntent,
  createOrUpdateAcademyMembershipSubscription,
  createOrUpdateGeneralMembershipSubscription,
  stripeWebhook,
  createCustomSubscription,
};
