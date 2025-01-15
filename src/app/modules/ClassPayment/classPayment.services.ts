import QueryBuilder from '../../builder/QueryBuilder';
import { IClassPayment } from './classPayment.interface';
import ClassPayment from './classPayment.model';

const createClassPaymentIntoDB = async (payload: IClassPayment) => {
  const result = await ClassPayment.create(payload);
  return result;
};

const getClassPaymentListFromDB = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(
    ClassPayment.find().populate([
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

const getUserClassPaymentListFormDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const paymentQuery = new QueryBuilder(
    ClassPayment.find({ email: email }),
    query,
  )
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

const updateClassPaymentIntoDB = async (
  id: string,
  payload: Partial<IClassPayment>,
) => {
  const result = await ClassPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deleteClassPaymentFromDB = async (id: string) => {
  const result = await ClassPayment.findByIdAndDelete(id);
  return result;
};

export const ClassPaymentServices = {
  createClassPaymentIntoDB,
  updateClassPaymentIntoDB,
  getClassPaymentListFromDB,
  getUserClassPaymentListFormDB,
  deleteClassPaymentFromDB,
};
