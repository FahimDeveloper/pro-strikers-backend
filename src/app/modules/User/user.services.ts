import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IUser, IUserMembership } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { generateRandomPassword } from '../../utils/generateRandomPassword';
import {
  sendClientAccountConfirmationEmail,
} from '../../utils/email';
import MembershipPayment from '../MembershipPayment/membershipPayment.model';

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

// const createMembershipByUserIntoDB = async (
//   id: string,
//   payload: IUserMembership,
// ) => {
//   const session = await mongoose.startSession();
//   const { membership, payment_info } = payload;
//   try {
//     session.startTransaction();
//     // const result = await User.findByIdAndUpdate(id, membership, { session });
//     // if (!result) {
//     //   throw new Error('Failed to get membership');
//     // }
//     // await MembershipPayment.create([payment_info], { session });
//     await sendMembershipPurchasedConfirmationEmail({
//       transactionId: payment_info.transaction_id,
//       email: payment_info.email,
//       membership: membership,
//       amount: payment_info.amount,
//     });
//     await session.commitTransaction();
//     await session.endSession();
//     return;
//   } catch (error: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     await sendMembershipPurchasedFailedNotifyEmail({
//       transactionId: payment_info.transaction_id,
//       email: payment_info.email,
//       membership: membership,
//       amount: payment_info.amount,
//     });
//     console.log(error?.message);
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       'Your membership purchase was unsuccessful, but your payment went through. There was an issue with our processing. Please be patient; our customer support team will contact you as soon as possible to assist you further.',
//     );
//   }
// };

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
  // createMembershipByUserIntoDB,
};
