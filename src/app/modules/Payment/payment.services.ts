import mongoose from 'mongoose';
import { IPayment } from './payment.interface';
import Payment from './payment.modal';
import QueryBuilder from '../../builder/QueryBuilder';

const createPaymentIntoDB = async (payload: IPayment) => {
  const result = await Payment.create(payload);
  return result;
};

const getPaymentListFromDB = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(
    Payment.find().populate([
      {
        path: 'user',
      },
    ]),
    query,
  )
    .search(['email', 'transaction_id'])
    .filter()
    .paginate();
  const result = await paymentQuery?.modelQuery;
  const count = await paymentQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getUserPaymentListFormDB = async (id: string) => {
  const result = await Payment.find({ user: id });
  return result;
};

const updatePaymentIntoDB = async (id: string, payload: Partial<IPayment>) => {
  const result = await Payment.findByIdAndUpdate(id, payload);
  return result;
};

const deletePaymentFromDB = async (id: string) => {
  const result = await Payment.findByIdAndDelete(id);
  return result;
};

export const PaymentServices = {
  createPaymentIntoDB,
  updatePaymentIntoDB,
  deletePaymentFromDB,
  getPaymentListFromDB,
  getUserPaymentListFormDB,
};
