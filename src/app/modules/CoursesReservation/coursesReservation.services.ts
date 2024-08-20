import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSchedule } from '../CourseSchedule/courseSchedule.model';
import { ICourseReservation } from './coursesReservation.interface';
import { CourseReservation } from './coursesReservation.model';

const createCourseReservationIntoDB = async (payload: ICourseReservation) => {
  const checkCourse = await CourseSchedule.findById(payload.course);
  if (!checkCourse) {
    throw new Error('Bootcamp not found, Please enter a valid Bootcamp ID');
  }
  const result = await CourseReservation.create(payload);
  return result;
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
    CourseReservation.find().populate('course'),
    query,
  )
    .search(['email'])
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
