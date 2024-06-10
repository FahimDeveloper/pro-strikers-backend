import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.services';

const createOrder = catchAsync(async (req, res) => {
  await OrderServices.createOrderIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Order created successfully');
});

const getAllOrders = catchAsync(async (req, res) => {
  const { result, count } = await OrderServices.getAllOrdersFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Orders fetched successfully',
    result,
    count,
  );
});

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getSingleOrderFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Order fetched successfully', result);
});

const updateOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.updateOrderIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Order updated successfully', result);
});

const deleteOrder = catchAsync(async (req, res) => {
  await OrderServices.deleteOrderFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Order deleted successfully');
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
