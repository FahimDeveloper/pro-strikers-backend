import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ClassSchedule } from '../ClassSchedule/classSchedule.model';
import {
  IClassReservation,
  IClassReservationByUser,
} from './classReservation.interface';
import { ClassReservation } from './classReservation.model';
import mongoose from 'mongoose';
import WebPayment from '../WebPayment/webPayment.modal';

const createClassReservationIntoDB = async (payload: IClassReservation) => {
  const date = new Date(payload.class_date);
  const kidsClass = await ClassSchedule.findById(payload.class);
  if (!kidsClass) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Class not found,');
  }
  const count = await ClassReservation.find({
    _id: kidsClass._id,
    day: date,
  }).countDocuments();
  if (count >= kidsClass.capacity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Class capacity exceeded');
  }
  const result = await ClassReservation.create(payload);
  return result;
};

const createClassReservationByUserIntoDB = async (
  payload: IClassReservationByUser,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { class_data, payment_info } = payload;
    const date = new Date(class_data.class_date);
    const kidsClass = await ClassSchedule.findById(class_data.class);
    if (!kidsClass) {
      throw new Error('Class not found');
    }
    const count = await ClassReservation.find({
      _id: kidsClass._id,
      day: date,
    }).countDocuments();
    if (count >= kidsClass.capacity) {
      throw new Error('Class capacity exceeded');
    }
    await ClassReservation.create([class_data], { session });
    await WebPayment.create([payment_info], { session });
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

const updateClassReservationIntoDB = async (
  id: string,
  payload: Partial<IClassReservation>,
) => {
  const result = await ClassReservation.findByIdAndUpdate(id, payload);
  return result;
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
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .search(['email', 'phone'])
    .filter()
    .paginate();
  const result = await classReservationQuery?.modelQuery;
  const count = await classReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getUserClassReservationListFromDB = async (email: string) => {
  const result = await ClassReservation.find({ email: email });
  return result;
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
  createClassReservationIntoDB,
  createClassReservationByUserIntoDB,
  getUserClassReservationListFromDB,
  updateClassReservationIntoDB,
  getAllClassesReservationsFromDB,
  getSingleClassReservationFromDB,
  deleteClassReservationFromDB,
};
