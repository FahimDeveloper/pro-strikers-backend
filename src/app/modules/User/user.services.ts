import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { generateRandomPassword } from '../../utils/generateRandomPassword';
import { sendClientAccountConfirmationEmail } from '../../utils/email';
import mongoose from 'mongoose';
import CreditPayment from '../CreditPayment/creditPayment.modal';

const createUserIntoDB = async (payload: IUser, file: any) => {
  const findUser = await User.isUserExistsByEmail(payload.email);
  if (findUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists!');
  }
  const randomPass = generateRandomPassword();
  let result;
  if (file?.path) {
    const { url } = await uploadImageIntoCloduinary(file);
    result = await User.create({
      ...payload,
      image: url,
      password: randomPass,
    });
  } else {
    result = await User.create({
      ...payload,
      password: randomPass,
      verified: true,
    });
  }
  if (result) {
    await sendClientAccountConfirmationEmail({
      email: payload.email,
      password: randomPass,
    });
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
    result = await User.findByIdAndUpdate(
      id,
      {
        ...payload,
        image: url,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  } else {
    result = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
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

const waiverSignWebhook = async (req: any, res: any) => {
  const raw = req.body.toString('utf8');
  let data;
  try {
    data = JSON.parse(raw);
    const { email } = data;
    if (email) {
      await User.findOneAndUpdate(
        { email },
        { waiver_signed: true },
        { new: true },
      );
    }
  } catch (err) {
    console.log('Not valid JSON, maybe form-data or XML?');
  }

  return { received: true };
};

const addGeneralCreditOnUserAccount = async (payload: any, id: string) => {
  const { credit_info, payment_info } = payload;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.findByIdAndUpdate(
      id,
      {
        $set: {
          'general_membership.credit_balance': credit_info,
        },
      },
      { new: true, session },
    );
    await CreditPayment.create([payment_info], { session });
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to add credit',
    );
  }
};

const addAcademyCreditOnUserAccount = async (payload: any, id: string) => {
  const { credit_info, payment_info } = payload;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.findByIdAndUpdate(
      id,
      {
        $set: {
          'academy_membership.credit_balance': credit_info,
        },
      },
      { new: true, session },
    );
    await CreditPayment.create([payment_info], { session });
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to add credit',
    );
  }
};

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUsersFromDB,
  getUsersEmailFromDB,
  getMembershipUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  waiverSignWebhook,
  addAcademyCreditOnUserAccount,
  addGeneralCreditOnUserAccount,
};
