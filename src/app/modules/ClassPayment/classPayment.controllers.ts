import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassPaymentServices } from './classPayment.services';

const createClassPayment = catchAsync(async (req, res) => {
  const result = await ClassPaymentServices.createClassPaymentIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getClassPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await ClassPaymentServices.getClassPaymentListFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Payment fetched successfully',
    result,
    count,
  );
});

const getUserClassPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await ClassPaymentServices.getUserClassPaymentListFormDB(
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

const updateClassPayment = catchAsync(async (req, res) => {
  const result = await ClassPaymentServices.updateClassPaymentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deleteClassPayment = catchAsync(async (req, res) => {
  await ClassPaymentServices.deleteClassPaymentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const ClassPaymentControllers = {
  createClassPayment,
  updateClassPayment,
  deleteClassPayment,
  getClassPaymentList,
  getUserClassPaymentList,
};
