import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassScheduleServices } from './classSchedule.services';

const createClass = catchAsync(async (req, res) => {
  await ClassScheduleServices.createClassIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Class created succesfully');
});

const getAllClasses = catchAsync(async (req, res) => {
  const { count, result } = await ClassScheduleServices.getAllClassesFromDB(
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Class fetch succesfully', result, count);
});

const getSingleClass = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.getSingleClassFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Class fetch succesfully', result);
});

const updateClass = catchAsync(async (req, res) => {
  await ClassScheduleServices.updateClassIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Class updated succesfully');
});

const deleteClass = catchAsync(async (req, res) => {
  await ClassScheduleServices.deleteClassFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Class deleted succesfully');
});

export const ClassSheduleControllers = {
  createClass,
  getAllClasses,
  getSingleClass,
  updateClass,
  deleteClass,
};
