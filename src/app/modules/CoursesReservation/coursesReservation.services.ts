import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSchedule } from '../CourseSchedule/courseSchedule.model';
import {
  ICourseReservation,
  ICourseReservationRequest,
} from './coursesReservation.interface';
import { CourseReservation } from './coursesReservation.model';
import mongoose from 'mongoose';
import WebPayment from '../WebPayment/webPayment.modal';
import moment from 'moment';
import BootcampPayment from '../BootcampPayment/bootcampPayment.model';

const createCourseReservationIntoDB = async (payload: ICourseReservation) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const checkCourse = await CourseSchedule.findById(payload.course);
    if (!checkCourse) {
      throw new Error('Bootcamp not found, Please enter a valid Bootcamp ID');
    } else {
      const endDate = new Date(checkCourse?.end_date);
      if (new Date().getDate() > endDate.getDate()) {
        throw new Error(
          `This Bootcamp period has been closed ${moment(endDate).format('dddd, MMMM Do YYYY')}`,
        );
      } else if (checkCourse.capacity <= checkCourse.enrolled) {
        throw new Error(
          'Bootcamp is fully booked, please choose another bootcamp',
        );
      } else {
        await CourseSchedule.findByIdAndUpdate(
          payload.course,
          { $inc: { enrolled: 1 } },
          { new: true, runValidators: true, session },
        );
        await CourseReservation.create([payload], { session });
        await session.commitTransaction();
        await session.endSession();
        return;
      }
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed to create reservation',
    );
  }
};

const createCourseReservationByUserIntoDB = async (
  payload: ICourseReservationRequest,
) => {
  const session = await mongoose.startSession();
  const { course_data, payment_info } = payload;
  try {
    session.startTransaction();
    const checkCourse = await CourseSchedule.findById(course_data.course);
    if (!checkCourse) {
      throw new Error('Bootcamp not found');
    } else if (checkCourse.capacity === checkCourse.enrolled) {
      throw new Error('Course is fully booked, please choose another course');
    } else {
      await CourseSchedule.findByIdAndUpdate(
        course_data.course,
        { $inc: { enrolled: 1 } },
        { new: true, runValidators: true, session },
      );
      const payment = await BootcampPayment.create([payment_info], { session });
      const createPayload = {
        ...course_data,
        payment: payment[0]._id,
      };
      await CourseReservation.create([createPayload], { session });
      await session.commitTransaction();
      await session.endSession();
      return;
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed to create reservation',
    );
  }
};

const updateCourseReservationIntoDB = async (
  id: string,
  payload: Partial<ICourseReservation>,
) => {
  const result = await CourseReservation.findByIdAndUpdate(id, payload);
  return result;
};

const getAllCoursesReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const CourseReservationQuery = new QueryBuilder(
    CourseReservation.find().populate([
      {
        path: 'course',
      },
      {
        path: 'user',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .search(['email', 'first_name', 'last_name', 'phone'])
    .filter()
    .paginate();
  const result = await CourseReservationQuery?.modelQuery;
  const count = await CourseReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleCourseReservationFromDB = async (id: string) => {
  const result = await CourseReservation.findById(id);
  return result;
};

const getUserCourseReservationListFromDB = async (
  query: Record<string, unknown>,
) => {
  const CourseReservationQuery = new QueryBuilder(
    CourseReservation.find().populate([
      {
        path: 'course',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .filter()
    .paginate();
  const result = await CourseReservationQuery?.modelQuery;
  const count = await CourseReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const deleteCourseReservationFromDB = async (id: string) => {
  const result = await CourseReservation.findByIdAndDelete(id);
  return result;
};

export const CourseReservationServices = {
  createCourseReservationIntoDB,
  createCourseReservationByUserIntoDB,
  updateCourseReservationIntoDB,
  getUserCourseReservationListFromDB,
  getAllCoursesReservationsFromDB,
  getSingleCourseReservationFromDB,
  deleteCourseReservationFromDB,
};
