import mongoose from 'mongoose';
import { IWebPayment } from './webPayment.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import WebPayment from './webPayment.modal';

const createPaymentIntoDB = async (payload: IWebPayment) => {
  const result = await WebPayment.create(payload);
  return result;
};

const getPaymentListFromDB = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(
    WebPayment.find().populate([
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
  const result = await WebPayment.find({ user: id });
  return result;
};

const updatePaymentIntoDB = async (
  id: string,
  payload: Partial<IWebPayment>,
) => {
  const result = await WebPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deletePaymentFromDB = async (id: string) => {
  const result = await WebPayment.findByIdAndDelete(id);
  return result;
};

export const PaymentServices = {
  createPaymentIntoDB,
  updatePaymentIntoDB,
  deletePaymentFromDB,
  getPaymentListFromDB,
  getUserPaymentListFormDB,
};
