import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ClassSchedule } from '../ClassSchedule/classSchedule.model';
import {
  IClassReservation,
  IClassReservationRequest,
} from './classReservation.interface';
import { ClassReservation } from './classReservation.model';
import mongoose from 'mongoose';
import ClassPayment from '../ClassPayment/classPayment.model';
import { User } from '../User/user.model';
import Notification from '../Notification/notification.modal';
import { io } from '../../../server';

const createClassReservationByAdminIntoDB = async (
  payload: IClassReservationRequest,
) => {
  const session = await mongoose.startSession();
  const { class_data, payment_info } = payload;
  try {
    session.startTransaction();
    const date = new Date(class_data.class_date);
    const kidsClass = await ClassSchedule.findById(class_data.class);
    if (!kidsClass) {
      throw new Error('Training not found');
    }
    const count = await ClassReservation.find({
      _id: kidsClass._id,
      day: date,
    }).countDocuments();
    if (count >= kidsClass.capacity) {
      throw new Error('Training capacity exceeded');
    }
    const user = await User.findOne({ email: class_data?.email });
    if (!user) {
      throw new Error('User not found, Please check the email is valid or not');
    }
    class_data.user = user?._id as any;
    const payment = await ClassPayment.create([payment_info], { session });
    const createPayload = {
      ...class_data,
      payment: payment[0]._id,
    };
    await ClassReservation.create([createPayload], { session });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed class reservation',
    );
  }
};

const createClassReservationByUserIntoDB = async (
  payload: IClassReservationRequest,
) => {
  const session = await mongoose.startSession();
  const { class_data, payment_info } = payload;
  try {
    session.startTransaction();
    const user = await User.findById(class_data?.user);
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
    }
    const date = new Date(class_data.class_date);
    const kidsClass = await ClassSchedule.findById(class_data.class);
    if (!kidsClass) {
      throw new Error('Training not found');
    }
    const count = await ClassReservation.find({
      _id: kidsClass._id,
      day: date,
    }).countDocuments();
    if (count >= kidsClass.capacity) {
      throw new Error('Training capacity exceeded');
    }
    const payment = await ClassPayment.create([payment_info], { session });
    const createPayload = {
      ...class_data,
      payment: payment[0]._id,
    };
    await ClassReservation.create([createPayload], { session });
    if (
      user?.membership &&
      user?.package_name === 'youth training membership' &&
      user?.credit_balance
    ) {
      const sessionCredit = user.credit_balance.session_credit;
      const newSessionCredit = Math.max(Number(sessionCredit) - 1).toString();
      await User.findByIdAndUpdate(user?._id, {
        credit_balance: {
          session_credit: newSessionCredit,
        },
      });
    }
    await Notification.create(
      [
        {
          title: 'Class Reservation',
          message: `A new reservation for Kid's training`,
          type: 'bootcamp',
        },
      ],
      { session },
    );
    await session.commitTransaction();
    await session.endSession();
    io.emit('notification', 'new-notification');
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed class reservation',
    );
  }
};

const getAllClassesReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const classReservationQuery = new QueryBuilder(
    ClassReservation.find().populate([
      {
        path: 'class',
      },
      {
        path: 'user',
      },
      {
        path: 'payment',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .search(['email'])
    .filter()
    .paginate();
  const result = await classReservationQuery?.modelQuery;
  const count = await classReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getAcademyAllOwnClassesReservationsFromDB = async (
  academy: string,
  query: Record<string, unknown>,
) => {
  const classReservationQuery = new QueryBuilder(
    ClassReservation.find({ academy: academy }).populate([
      {
        path: 'class',
      },
      {
        path: 'user',
      },
      {
        path: 'payment',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .search(['email'])
    .filter()
    .paginate();
  const result = await classReservationQuery?.modelQuery;
  const count = await classReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getUserClassReservationListFromDB = async (
  query: Record<string, unknown>,
) => {
  const classReservationQuery = new QueryBuilder(
    ClassReservation.find().populate([
      {
        path: 'class',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
      {
        path: 'payment',
      },
    ]),
    query,
  )
    .filter()
    .paginate();
  const result = await classReservationQuery?.modelQuery;
  const count = await classReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleClassReservationFromDB = async (id: string) => {
  const result = await ClassReservation.findById(id);
  return result;
};

const deleteClassReservationFromDB = async (id: string) => {
  const result = await ClassReservation.findByIdAndDelete(id);
  return result;
};

export const ClassReservationServices = {
  createClassReservationByAdminIntoDB,
  createClassReservationByUserIntoDB,
  getUserClassReservationListFromDB,
  getAllClassesReservationsFromDB,
  getSingleClassReservationFromDB,
  deleteClassReservationFromDB,
  getAcademyAllOwnClassesReservationsFromDB,
};
