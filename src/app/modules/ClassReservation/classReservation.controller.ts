import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassReservationServices } from './classReservation.services';

const createClassReservationByAdmin = catchAsync(async (req, res) => {
  await ClassReservationServices.createClassReservationByAdminIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Resevation create success');
});

const createClassReservationByUser = catchAsync(async (req, res) => {
  await ClassReservationServices.createClassReservationByUserIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Resevation success');
});

const getAllClassesReservation = catchAsync(async (req, res) => {
  const { count, result } =
    await ClassReservationServices.getAllClassesReservationsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Classes reservation fetch succesfully',
    result,
    count,
  );
});

const getUserClassReservationList = catchAsync(async (req, res) => {
  const { count, result } =
    await ClassReservationServices.getUserClassReservationListFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Class reservation fetch succesfully',
    result,
    count,
  );
});

const getSingleClassReservation = catchAsync(async (req, res) => {
  const result = await ClassReservationServices.getSingleClassReservationFromDB(
    req.params.id,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Class reservation fetch succesfully',
    result,
  );
});

const deleteClassReservation = catchAsync(async (req, res) => {
  await ClassReservationServices.deleteClassReservationFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Class reservation deleted succesfully');
});

export const ClassReservationController = {
  createClassReservationByAdmin,
  createClassReservationByUser,
  getUserClassReservationList,
  getAllClassesReservation,
  getSingleClassReservation,
  deleteClassReservation,
};
