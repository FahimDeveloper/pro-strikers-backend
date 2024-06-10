import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import fs from 'fs';

const createAdminUserIntoDB = async (payload: IAdmin, file: any) => {
  const findAdminUser = await Admin.isAdminExists(payload.email);
  if (findAdminUser) {
    throw new AppError(httpStatus.CONFLICT, 'Admin user already exists!');
  }
  let result;
  if (file?.path) {
    const { url } = await uploadImageIntoCloduinary(file);
    result = await Admin.create({ ...payload, image: url });
  }
  result = await Admin.create(payload);
  return result;
};

const updateAdminUserIntoDB = async (
  id: string,
  payload: Partial<IAdmin>,
  file: any,
) => {
  let result;
  if (file?.path) {
    const { url } = await uploadImageIntoCloduinary(file);
    result = await Admin.findByIdAndUpdate(id, {
      ...payload,
      image: url,
    });
  } else {
    result = await Admin.findByIdAndUpdate(id, payload);
  }
  return result;
};

const getAllTrainersFromDB = async () => {
  const result = await Admin.find({ role: 'trainer' }).select(
    'first_name last_name',
  );
  return result;
};

const getAllAdminUsersFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find().select('-password'), query)
    .search(['email', 'first_name', 'last_name'])
    .filter()
    .paginate();
  const result = await adminQuery?.modelQuery;
  const count = await adminQuery?.countTotal();
  return { result, count };
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
