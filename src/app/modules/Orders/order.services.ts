import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IOrder, IOrderRequest, ITimeline } from './order.interface';
import { Order } from './order.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { Product } from '../Product/product.model';
import WebPayment from '../WebPayment/webPayment.modal';

const createOrderIntoDB = async (payload: IOrderRequest) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { orders, payment_info } = payload;
    for (const order of orders) {
      await Order.create([order], { session });
    }
    await WebPayment.create([payment_info], { session });
    await session.commitTransaction();
    session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed to create order',
    );
  }
};

const updateOrderIntoDB = async (id: string, timeline: ITimeline) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error('Order not found.');
    }
    const product = await Product.findById(order?.product);
    if (!product) {
      throw new Error('Product not found.');
    }
    // if (timeline?.status !== 'pending' && timeline?.status !== 'cancelled') {
    //   const variation = product?.variations.find(
    //     v => v.color === order.color && v.size === order.size,
    //   );
    //   if (!variation) {
    //     throw new Error('Product variation not found.');
    //   }
    //   variation.stock = Math.max(0, variation.stock - order.quantity);
    //   await product.save({ session });
    // }
    const result = await Order.findByIdAndUpdate(
      id,
      {
        status: timeline.status,
        $push: {
          timeline: timeline,
        },
      },
      { new: true, session },
    );
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed to update order status',
    );
  }
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

const cancelOrderFromDB = async (id: string, timeline: ITimeline) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await Order.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    // const product = await Product.findById(order?.product);
    // if (!product) {
    //   throw new Error('Product not found.');
    // }

    // const variation = product.variations.find(
    //   v => v.color === order.color && v.size === order.size,
    // );

    // if (!variation) {
    //   throw new Error('Product variation not found.');
    // }

    // variation.stock = variation.stock + order.quantity;
    // await product.save();

    const result = await Order.findByIdAndUpdate(
      id,
      {
        status: timeline.status,
        $push: {
          timeline: timeline,
        },
      },
      { new: true, session: session },
    );

    if (!result) {
      throw new Error('Failed order cancellation, Try again');
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
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
