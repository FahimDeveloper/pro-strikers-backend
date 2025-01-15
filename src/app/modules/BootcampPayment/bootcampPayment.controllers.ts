import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BootcampPaymentServices } from './bootcampPayment.services';

const createBootcampPayment = catchAsync(async (req, res) => {
  const result = await BootcampPaymentServices.createBootcampPaymentIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getBootcampPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await BootcampPaymentServices.getBootcampPaymentListFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Payment fetched successfully',
    result,
    count,
  );
});

const getUserBootcampPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await BootcampPaymentServices.getUserBootcampPaymentListFormDB(
      req.query,
      req.params.email,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Payment List fetched successfully',
    result,
    count,
  );
});

const updateBootcampPayment = catchAsync(async (req, res) => {
  const result = await BootcampPaymentServices.updateBootcampPaymentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deleteBootcampPayment = catchAsync(async (req, res) => {
  await BootcampPaymentServices.deleteBootcampPaymentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const BootcampPaymentControllers = {
  createBootcampPayment,
  updateBootcampPayment,
  deleteBootcampPayment,
  getBootcampPaymentList,
  getUserBootcampPaymentList,
};
