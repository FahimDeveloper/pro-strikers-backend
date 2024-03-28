import { AdminModel } from './admin.model';

const getAllAdminsFromDB = async () => {
  const result = await AdminModel.find({});
  return result;
};

const getSingleAdminFromDB = async (email: string) => {
  const result = await AdminModel.find({ email });
  return result;
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
};
