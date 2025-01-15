import QueryBuilder from '../../builder/QueryBuilder';
import { IBootcampPayment } from './bootcampPayment.interface';
import BootcampPayment from './bootcampPayment.model';

const createBootcampPaymentIntoDB = async (payload: IBootcampPayment) => {
  const result = await BootcampPayment.create(payload);
  return result;
};

const getBootcampPaymentListFromDB = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(
    BootcampPayment.find().populate([
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .search(['email', 'transaction_id'])
    .filter()
    .monthFilter()
    .paginate();
  const result = await paymentQuery?.modelQuery;
  const count = await paymentQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getUserBootcampPaymentListFormDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const paymentQuery = new QueryBuilder(
    BootcampPayment.find({ email: email }),
    query,
  )
    .filter()
    .paginate();
  const result = await paymentQuery?.modelQuery;
  const count = await paymentQuery?.countTotal();
  return {
    count,
    result,
  };
};

const updateBootcampPaymentIntoDB = async (
  id: string,
  payload: Partial<IBootcampPayment>,
) => {
  const result = await BootcampPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deleteBootcampPaymentFromDB = async (id: string) => {
  const result = await BootcampPayment.findByIdAndDelete(id);
  return result;
};

export const BootcampPaymentServices = {
  createBootcampPaymentIntoDB,
  updateBootcampPaymentIntoDB,
  getBootcampPaymentListFromDB,
  getUserBootcampPaymentListFormDB,
  deleteBootcampPaymentFromDB,
};
