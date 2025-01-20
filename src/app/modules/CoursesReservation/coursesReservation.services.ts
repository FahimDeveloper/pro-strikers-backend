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
import BootcampPayment from '../BootcampPayment/bootcampPayment.model';
import { User } from '../User/user.model';

const createCourseReservationByAdminIntoDB = async (
  payload: ICourseReservationRequest,
) => {
  const session = await mongoose.startSession();
  const { course_data, payment_info } = payload;
  try {
    session.startTransaction();
    const user = await User.findOne({ email: course_data?.email });
    if (!user) {
      throw new Error('User not found, Please check the email is valid or not');
    }
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
        user: user?._id,
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
      {
        path: 'payment',
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
      {
        path: 'payment',
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
  createCourseReservationByAdminIntoDB,
  createCourseReservationByUserIntoDB,
  updateCourseReservationIntoDB,
  getUserCourseReservationListFromDB,
  getAllCoursesReservationsFromDB,
  getSingleCourseReservationFromDB,
  deleteCourseReservationFromDB,
};
