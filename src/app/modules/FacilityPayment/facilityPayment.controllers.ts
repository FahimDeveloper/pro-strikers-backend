import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityPaymentServices } from './facilityPayment.services';

const createFacilityPayment = catchAsync(async (req, res) => {
  const result = await FacilityPaymentServices.createFacilityPaymentIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getFacilityPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await FacilityPaymentServices.getFacilityPaymentListFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Payment fetched successfully',
    result,
    count,
  );
});

const getUserFacilityPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await FacilityPaymentServices.getUserFacilityPaymentListFormDB(
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

const updateFacilityPayment = catchAsync(async (req, res) => {
  const result = await FacilityPaymentServices.updateFacilityPaymentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deleteFacilityPayment = catchAsync(async (req, res) => {
  await FacilityPaymentServices.deleteFacilityPaymentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const FacilityPaymentControllers = {
  createFacilityPayment,
  updateFacilityPayment,
  deleteFacilityPayment,
  getFacilityPaymentList,
  getUserFacilityPaymentList,
};
