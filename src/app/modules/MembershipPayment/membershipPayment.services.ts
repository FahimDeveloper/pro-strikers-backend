import QueryBuilder from '../../builder/QueryBuilder';
import { IMembershipPayment } from './membershipPayment.interface';
import MembershipPayment from './membershipPayment.model';

const createMembershipPaymentIntoDB = async (payload: IMembershipPayment) => {
  const result = await MembershipPayment.create(payload);
  return result;
};

const getMembershipPaymentListFromDB = async (
  query: Record<string, unknown>,
) => {
  const paymentQuery = new QueryBuilder(MembershipPayment.find(), query)
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

const getUserMembershipPaymentListFormDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const paymentQuery = new QueryBuilder(
    MembershipPayment.find({ email: email }),
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

const updateMembershipPaymentIntoDB = async (
  id: string,
  payload: Partial<IMembershipPayment>,
) => {
  const result = await MembershipPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deleteMembershipPaymentFromDB = async (id: string) => {
  const result = await MembershipPayment.findByIdAndDelete(id);
  return result;
};

export const MembershipPaymentServices = {
  createMembershipPaymentIntoDB,
  updateMembershipPaymentIntoDB,
  getMembershipPaymentListFromDB,
  getUserMembershipPaymentListFormDB,
  deleteMembershipPaymentFromDB,
};
