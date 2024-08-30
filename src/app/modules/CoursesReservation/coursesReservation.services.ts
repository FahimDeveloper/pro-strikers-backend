import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSchedule } from '../CourseSchedule/courseSchedule.model';
import { ICourseReservation } from './coursesReservation.interface';
import { CourseReservation } from './coursesReservation.model';

const createCourseReservationIntoDB = async (payload: ICourseReservation) => {
  const checkCourse = await CourseSchedule.findById(payload.course);
  if (!checkCourse) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Bootcamp not found, Please enter a valid Bootcamp ID',
    );
  } else if (checkCourse?.sport !== payload.sport) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Reservation sport and bootcamp sport not match',
    );
  } else if (checkCourse.capacity === checkCourse.enrolled) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Course is fully booked, please choose another course',
    );
  } else {
    const updatedCourse = await CourseSchedule.findByIdAndUpdate(
      payload.course,
      { $inc: { enrolled: 1 } },
      { new: true, runValidators: true },
    );
    if (!updatedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed course enrollment, Try again later or contact with support',
      );
    }
    const result = await CourseReservation.create(payload);
    return result;
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
        path: 'trainer',
        select: 'first_name last_name phone',
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

const deleteCourseReservationFromDB = async (id: string) => {
  const result = await CourseReservation.findByIdAndDelete(id);
  return result;
};

export const CourseReservationServices = {
  createCourseReservationIntoDB,
  updateCourseReservationIntoDB,
  getAllCoursesReservationsFromDB,
  getSingleCourseReservationFromDB,
  deleteCourseReservationFromDB,
};
