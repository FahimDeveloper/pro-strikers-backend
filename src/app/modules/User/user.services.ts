import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import fs from 'fs';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { sendEmail } from '../../utils/sendEmail';
import { generateRandomPassword } from '../../utils/generateRandomPassword';

const createUserIntoDB = async (payload: IUser, file: any) => {
  const findUser = await User.isUserExistsByEmail(payload.email);
  if (findUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists!');
  }
  const randomPass = generateRandomPassword();
  let result;
  if (file?.path) {
    const { url } = await uploadImageIntoCloduinary(file);
    result = await User.create({ ...payload, image: url });
  } else {
    result = await User.create(payload);
  }
  if (result) {
    await sendEmail({ email: payload.email, password: randomPass });
  }
  return result;
};

const updateUserIntoDB = async (
  id: string,
  payload: Partial<IUser>,
  file: any,
) => {
  let result;
  if (file?.path) {
    const { url } = await uploadImageIntoCloduinary(file);
    result = await User.findByIdAndUpdate(id, {
      ...payload,
      image: url,
    });
  } else {
    result = await User.findByIdAndUpdate(id, payload);
  }
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().select('-password'), query)
    .search(['email', 'first_name', 'last_name'])
    .filter()
    .paginate();
  const result = await userQuery?.modelQuery;
  const count = await userQuery?.countTotal();
  return { result, count };
};

const getUsersEmailFromDB = async () => {
  const result = await User.find().select('email');
  return result;
};

const getMembershipUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(
    User.find({ membership: true }).select('-password'),
    query,
  )
    .search(['email', 'first_name', 'last_name'])
    .filter()
    .paginate();
  const result = await userQuery?.modelQuery;
  const count = await userQuery?.countTotal();
  return { result, count };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUsersFromDB,
  getUsersEmailFromDB,
  getMembershipUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
