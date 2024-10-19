import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { Product } from '../Product/product.model';

const createOrderIntoDB = async (payload: IOrder) => {
  const result = await Order.create(payload);
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<IOrder>) => {
  const result = await Order.findByIdAndUpdate(id, payload);
  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const OrdersQuery = new QueryBuilder(Order.find().populate('product'), query)
    .search(['user_email'])
    .filter()
    .paginate();
  const result = await OrdersQuery?.modelQuery;
  const count = await OrdersQuery?.countTotal();
  return { result, count };
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const cancelOrderFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await Order.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    const updateOrder = await Order.findByIdAndUpdate(id, {
      status: 'cancelled',
    });

    if (!updateOrder) {
      throw new Error('Failed order cancellation, Try again');
    }

    const result = await Product.findByIdAndUpdate(
      order.product,
      { $inc: { quantity: order.quantity } },
      { new: true, runValidators: true },
    );

    if (!result) {
      throw new Error('Failed order cancellation, Try again');
    }

    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed to cancel order',
    );
  }
};

export const OrderServices = {
  createOrderIntoDB,
  updateOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  deleteOrderFromDB,
  cancelOrderFromDB,
};
