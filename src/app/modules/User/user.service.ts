import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAdmin } from '../Admin/admin.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { AdminModel } from '../Admin/admin.model';
import { TNormalUser } from '../NormalUser/normalUser.interface';
import { NormalUserModel } from '../NormalUser/normalUser.model';

const createNormalUserIntoDB = async (password: string, email: string) => {
  // create a user object
  const userData: Partial<TUser> = {};
  const payload: Partial<TNormalUser> = {};

  userData.password = password;
  userData.role = 'user';
  userData.email = email;

  try {
    const newUser = await User.create(userData);

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.user = newUser._id; //reference _id
    payload.email = email;

    const newNormalUser = await NormalUserModel.create(payload);

    if (!newNormalUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    return newNormalUser;
  } catch (err: any) {
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, email: string) => {
  // create a user object
  const userData: Partial<TUser> = {};
  const payload: Partial<TAdmin> = {};

  userData.password = password;
  userData.role = 'admin';
  userData.email = email;

  try {
    const newUser = await User.create(userData);

    //create a admin
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    payload.email = email;
    payload.user = newUser._id; //reference _id

    const newAdmin = await AdminModel.create(payload);

    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    return newAdmin;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const UserServices = {
  createNormalUserIntoDB,
  createAdminIntoDB,
};
