import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseScheduleServices } from './courseSchedule.services';

const createCourse = catchAsync(async (req, res) => {
  await CourseScheduleServices.createCourseIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Course created succesfully');
});

const getAllCourses = catchAsync(async (req, res) => {
  const { count, result } = await CourseScheduleServices.getAllCoursesFromDB(
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Course fetch succesfully', result, count);
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseScheduleServices.getSingleCourseFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Course fetch succesfully', result);
});

const getCourseByDate = catchAsync(async (req, res) => {
  const result = await CourseScheduleServices.getCourseByDateFromDB(req.body);
  sendResponse(res, httpStatus.OK, 'Course fetch succesfully', result);
});

const updateCourse = catchAsync(async (req, res) => {
  await CourseScheduleServices.updateCourseIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Course updated succesfully');
});

const deleteCourse = catchAsync(async (req, res) => {
  await CourseScheduleServices.deleteCourseFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Course deleted succesfully');
});

export const CourseSheduleControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getCourseByDate,
};
