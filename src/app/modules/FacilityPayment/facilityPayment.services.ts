import QueryBuilder from '../../builder/QueryBuilder';
import { IFacilityPayment } from './facilityPayment.interface';
import FacilityPayment from './facilityPayment.model';

const createFacilityPaymentIntoDB = async (payload: IFacilityPayment) => {
  const result = await FacilityPayment.create(payload);
  return result;
};

const getFacilityPaymentListFromDB = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(FacilityPayment.find(), query)
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

const getUserFacilityPaymentListFormDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const paymentQuery = new QueryBuilder(
    FacilityPayment.find({ email: email }),
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

const updateFacilityPaymentIntoDB = async (
  id: string,
  payload: Partial<IFacilityPayment>,
) => {
  const result = await FacilityPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deleteFacilityPaymentFromDB = async (id: string) => {
  const result = await FacilityPayment.findByIdAndDelete(id);
  return result;
};

export const FacilityPaymentServices = {
  createFacilityPaymentIntoDB,
  updateFacilityPaymentIntoDB,
  getFacilityPaymentListFromDB,
  getUserFacilityPaymentListFormDB,
  deleteFacilityPaymentFromDB,
};
