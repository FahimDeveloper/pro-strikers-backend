import QueryBuilder from '../../builder/QueryBuilder';
import { IMembershipCancellation } from './membershipCancellation.interface';
import { MembershipCancellation } from './membershipCancellation.model';

const getAllMembershipCancellationFromDB = async (
  query: Record<string, unknown>,
) => {
  const cancellationQuery = new QueryBuilder(
    MembershipCancellation.find(),
    query,
  )
    .search(['email'])
    .filter()
    .paginate();
  const result = await cancellationQuery?.modelQuery;
  const count = await cancellationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleMembershipCancellationFromDB = async (id: string) => {
  const result = await MembershipCancellation.findById(id);
  return result;
};

const getMembershipCancellationByEmailFromDB = async (email: string) => {
  const result = await MembershipCancellation.findOne({ email });
  return result;
};

const createMembershipCancellationIntoDB = async (
  payload: IMembershipCancellation,
) => {
  const result = await MembershipCancellation.create(payload);
  return result;
};

const updateMembershipCancellationIntoDB = async (
  id: string,
  payload: Partial<IMembershipCancellation>,
) => {
  const result = await MembershipCancellation.findByIdAndUpdate(id, payload);
  return result;
};

const deleteMembershipCancellationFromDB = async (id: string) => {
  const result = await MembershipCancellation.findByIdAndDelete(id);
  return result;
};

export const MembershipCancellationServices = {
  getAllMembershipCancellationFromDB,
  getSingleMembershipCancellationFromDB,
  getMembershipCancellationByEmailFromDB,
  createMembershipCancellationIntoDB,
  updateMembershipCancellationIntoDB,
  deleteMembershipCancellationFromDB,
};
