import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ClassSchedule } from '../ClassSchedule/classSchedule.model';
import { IClassReservation } from './classReservation.interface';
import { ClassReservation } from './classReservation.model';

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
  updateClassReservationIntoDB,
  getAllClassesReservationsFromDB,
  getSingleClassReservationFromDB,
  deleteClassReservationFromDB,
};
