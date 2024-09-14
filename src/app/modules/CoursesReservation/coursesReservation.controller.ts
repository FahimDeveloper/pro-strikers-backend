import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseReservationServices } from './coursesReservation.services';

const createCourseReservation = catchAsync(async (req, res) => {
  await CourseReservationServices.createCourseReservationIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Reservation create success');
});

const createCourseReservationByUser = catchAsync(async (req, res) => {
  await CourseReservationServices.createCourseReservationByUserIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const getAllCoursesReservation = catchAsync(async (req, res) => {
  const { count, result } =
    await CourseReservationServices.getAllCoursesReservationsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Coursees reservation fetch succesfully',
    result,
    count,
  );
});

const getUserCourseReservationList = catchAsync(async (req, res) => {
  const { result, count } =
    await CourseReservationServices.getUserCourseReservationListFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Course reservation fetch succesfully',
    result,
    count,
  );
});

const getSingleCourseReservation = catchAsync(async (req, res) => {
  const result =
    await CourseReservationServices.getSingleCourseReservationFromDB(
      req.params.id,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Course reservation fetch succesfully',
    result,
  );
});

const updateCourseReservation = catchAsync(async (req, res) => {
  await CourseReservationServices.updateCourseReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Course reservation updated succesfully');
});

const deleteCourseReservation = catchAsync(async (req, res) => {
  await CourseReservationServices.deleteCourseReservationFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Course reservation deleted succesfully');
});

export const CourseReservationController = {
  createCourseReservation,
  createCourseReservationByUser,
  getUserCourseReservationList,
  getAllCoursesReservation,
  getSingleCourseReservation,
  updateCourseReservation,
  deleteCourseReservation,
};
