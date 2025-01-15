import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShopPaymentServices } from './shopPayment.services';

const createShopPayment = catchAsync(async (req, res) => {
  const result = await ShopPaymentServices.createShopPaymentIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Payment created successfully', result);
});

const getShopPaymentList = catchAsync(async (req, res) => {
  const { result, count } = await ShopPaymentServices.getShopPaymentListFromDB(
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

const getUserShopPaymentList = catchAsync(async (req, res) => {
  const { result, count } =
    await ShopPaymentServices.getUserShopPaymentListFormDB(
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

const updateShopPayment = catchAsync(async (req, res) => {
  const result = await ShopPaymentServices.updateShopPaymentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Payment updated successfully', result);
});

const deleteShopPayment = catchAsync(async (req, res) => {
  await ShopPaymentServices.deleteShopPaymentFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Payment deleted successfully');
});

export const ShopPaymentControllers = {
  createShopPayment,
  updateShopPayment,
  deleteShopPayment,
  getShopPaymentList,
  getUserShopPaymentList,
};
