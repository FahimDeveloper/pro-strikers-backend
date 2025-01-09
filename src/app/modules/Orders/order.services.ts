import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IOrder, IOrderRequest, ITimeline } from './order.interface';
import { Order } from './order.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { Product } from '../Product/product.model';
import WebPayment from '../WebPayment/webPayment.modal';
import { IVariation } from '../Product/product.interface';
import {
  sendOrderCanceledByAdminNotifyEmail,
  sendOrderCanceledByUserNotifyEmail,
  sendShopPurchaseConfirmationEmail,
  sendShopPurchaseFailedNotifyEmail,
} from '../../utils/email';

const createOrderIntoDB = async (payload: IOrderRequest) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { orders, payment_info } = payload;
  try {
    for (const order of orders) {
      await Order.create([order], { session });
    }
    await WebPayment.create([payment_info], { session });
    await sendShopPurchaseConfirmationEmail({
      email: payment_info.email,
      data: orders,
      amount: payment_info.amount,
      transactionId: payment_info.transaction_id,
    });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    await sendShopPurchaseFailedNotifyEmail({
      email: payment_info.email,
      data: orders,
      amount: payment_info.amount,
      transactionId: payment_info.transaction_id,
    });
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed to place order',
    );
  }
};

const updateOrderIntoDB = async (id: string, timeline: ITimeline) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error('Order not found.');
    }

    const product = await Product.findById(order.product);
    if (!product) {
      throw new Error('Product not found.');
    }

    if (order.status === 'pending' && timeline.status !== 'canceled') {
      let variation = null;

      if (product.variations) {
        variation = product.variations.find(
          (v: IVariation) =>
            v?.color?.name === order.color && v.size === order.size,
        );
      }

      if (!variation) {
        if (product.color.name === order.color && product.size === order.size) {
          product.stock = Math.max(0, product.stock - order.quantity);
        } else {
          throw new Error('Product variation or size/color mismatch.');
        }
      } else {
        variation.stock = Math.max(0, variation?.stock! - order.quantity);
        await product.save();
      }

      if (!variation) {
        await product.save();
      }
    }
    const result = await Order.findByIdAndUpdate(
      id,
      {
        status: timeline.status,
        $push: { timeline: timeline },
      },
      { new: true },
    );

    return result;
  } catch (error: any) {
    // await session.abortTransaction();
    // await session.endSession();

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

const getUserOrdersFromDB = async (
  email: string,
  query: Record<string, unknown>,
) => {
  const OrdersQuery = new QueryBuilder(
    Order.find({ email: email }).populate({
      path: 'product',
      select: 'name thumbnail category brand',
    }),
    query,
  )
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

const cancelOrderByAdminFromDB = async (id: string, timeline: ITimeline) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await Order.findById(id).populate({
      path: 'product',
      select: 'name',
    });
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
    await sendOrderCanceledByAdminNotifyEmail({
      data: order,
      email: order?.email!,
      text: timeline?.note,
    });
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

const cancelOrderByUserFromDB = async (id: string, timeline: ITimeline) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await Order.findById(id).populate({
      path: 'product',
      select: 'name',
    });
    let result;
    if (order?.status === 'pending') {
      result = await Order.findByIdAndUpdate(
        id,
        {
          status: timeline.status,
          $push: {
            timeline: timeline,
          },
        },
        { new: true, session: session },
      );
      await sendOrderCanceledByUserNotifyEmail({
        data: order,
        email: order?.email!,
        text: timeline?.note,
      });
      if (!result) {
        throw new Error('Failed order cancellation, Try again');
      }
    } else {
      throw new Error(
        `Order is already ${order?.status}, for further processing contact with support`,
      );
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
  cancelOrderByAdminFromDB,
  cancelOrderByUserFromDB,
  getUserOrdersFromDB,
};
