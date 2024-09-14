import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentServices } from './webPayment.services';

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.createPaymentIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getPaymentList = catchAsync(async (req, res) => {
  const { result, count } = await PaymentServices.getPaymentListFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Payment fetched successfully',
    result,
    count,
  );
});

const getUserPaymentList = catchAsync(async (req, res) => {
  const { result, count } = await PaymentServices.getUserPaymentListFormDB(
    req.query,
    req.params.userId,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Payment List fetched successfully',
    result,
    count,
  );
});

const updatePayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.updatePaymentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deletePayment = catchAsync(async (req, res) => {
  await PaymentServices.deletePaymentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const PaymentControllers = {
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentList,
  getUserPaymentList,
};
