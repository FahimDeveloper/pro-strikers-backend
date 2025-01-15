import QueryBuilder from '../../builder/QueryBuilder';
import { IAppointmentPayment } from './appointmentPayment.interface';
import AppointmentPayment from './appointmentPayment.model';

const createAppointmentPaymentIntoDB = async (payload: IAppointmentPayment) => {
  const result = await AppointmentPayment.create(payload);
  return result;
};

const getAppointmentPaymentListFromDB = async (
  query: Record<string, unknown>,
) => {
  const paymentQuery = new QueryBuilder(
    AppointmentPayment.find().populate([
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

const getUserAppointmentPaymentListFormDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const paymentQuery = new QueryBuilder(
    AppointmentPayment.find({ email: email }),
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

const updateAppointmentPaymentIntoDB = async (
  id: string,
  payload: Partial<IAppointmentPayment>,
) => {
  const result = await AppointmentPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deleteAppointmentPaymentFromDB = async (id: string) => {
  const result = await AppointmentPayment.findByIdAndDelete(id);
  return result;
};

export const AppointmentPaymentServices = {
  createAppointmentPaymentIntoDB,
  updateAppointmentPaymentIntoDB,
  getAppointmentPaymentListFromDB,
  getUserAppointmentPaymentListFormDB,
  deleteAppointmentPaymentFromDB,
};
