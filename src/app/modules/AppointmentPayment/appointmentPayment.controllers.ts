import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentPaymentServices } from './appointmentPayment.services';

const createAppointmentPayment = catchAsync(async (req, res) => {
  const result =
    await AppointmentPaymentServices.createAppointmentPaymentIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getAppointmentPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await AppointmentPaymentServices.getAppointmentPaymentListFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Payment fetched successfully',
    result,
    count,
  );
});

const getUserAppointmentPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await AppointmentPaymentServices.getUserAppointmentPaymentListFormDB(
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

const updateAppointmentPayment = catchAsync(async (req, res) => {
  const result =
    await AppointmentPaymentServices.updateAppointmentPaymentIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deleteAppointmentPayment = catchAsync(async (req, res) => {
  await AppointmentPaymentServices.deleteAppointmentPaymentFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const AppointmentPaymentControllers = {
  createAppointmentPayment,
  updateAppointmentPayment,
  deleteAppointmentPayment,
  getAppointmentPaymentList,
  getUserAppointmentPaymentList,
};
