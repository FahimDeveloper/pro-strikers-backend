import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { ICourseSchedule } from './courseSchedule.interface';
import { CourseSchedule } from './courseSchedule.model';
import AppError from '../../errors/AppError';
import moment from 'moment';

const createCourseIntoDB = async (payload: ICourseSchedule) => {
  const result = await CourseSchedule.create(payload);
  return result;
};

const updateCourseIntoDB = async (
  id: string,
  payload: Partial<ICourseSchedule>,
) => {
  const result = await CourseSchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseSchedule.find(), query)
    .search(['course_name'])
    .filter()
    .rangeFilter()
    .paginate();
  const result = await courseQuery?.modelQuery;
  const count = await courseQuery?.countTotal();
  return { result, count };
};

const getCourseByDateFromDB = async (payload: any) => {
  const result = await CourseSchedule.findById(payload.id).select(
    'sport trainer start_date',
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
  }
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseSchedule.findById(id);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await CourseSchedule.findByIdAndDelete(id);
  return result;
};

export const CourseScheduleServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  getCourseByDateFromDB,
  deleteCourseFromDB,
};
