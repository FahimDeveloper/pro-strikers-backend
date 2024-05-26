import QueryBuilder from '../../builder/QueryBuilder';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdminUserIntoDB = async (payload: IAdmin) => {
  const result = await Admin.create(payload);
  return result;
};

const updateAdminUserIntoDB = async (id: string, payload: Partial<IAdmin>) => {
  const result = await Admin.findByIdAndUpdate(id, payload);
  return result;
};

const getAllTrainersFromDB = async () => {
  const result = await Admin.find({ role: 'trainer' }).select('_id full_name');
  return result;
};

const getAllAdminUsersFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find().select('-password'), query)
    .search(['email', 'first_name', 'last_name'])
    .filter()
    .paginate();
  const result = await adminQuery?.modelQuery;
  const count = await adminQuery?.countTotal();
  return { ...result, count };
};

const getSingleAdminUserFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const deleteAdminUserFromDB = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  getAllTrainersFromDB,
  createAdminUserIntoDB,
  updateAdminUserIntoDB,
  getAllAdminUsersFromDB,
  getSingleAdminUserFromDB,
  deleteAdminUserFromDB,
};
