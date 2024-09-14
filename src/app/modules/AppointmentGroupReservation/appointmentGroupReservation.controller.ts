import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentGroupReservationServices } from './appointmentGroupReservation.services';

const createAppointmentGroupReservation = catchAsync(async (req, res) => {
  await AppointmentGroupReservationServices.createAppointmentGroupReservationIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const createAppointmentGroupReservationByUser = catchAsync(async (req, res) => {
  await AppointmentGroupReservationServices.createAppointmentGroupReservationByUserIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const getAllAppointmentGroupReservation = catchAsync(async (req, res) => {
  const { count, result } =
    await AppointmentGroupReservationServices.getAllAppointmentGroupReservationsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment Group reservations fetch succesfully',
    result,
    count,
  );
});

const getSingleAppointmentGroupReservation = catchAsync(async (req, res) => {
  const result =
    await AppointmentGroupReservationServices.getSingleAppointmentGroupReservationFromDB(
      req.params.id,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment Group reservation fetch succesfully',
    result,
  );
});

const getUserAppointmentGroupReservationList = catchAsync(async (req, res) => {
  const { result, count } =
    await AppointmentGroupReservationServices.getUserAppointmentGroupReservationListFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'User appointment Group reservation list fetch succesfully',
    result,
    count,
  );
});

const updateAppointmentGroupReservation = catchAsync(async (req, res) => {
  await AppointmentGroupReservationServices.updateAppointmentGroupReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment Group reservation updated succesfully',
  );
});

const deleteAppointmentGroupReservation = catchAsync(async (req, res) => {
  await AppointmentGroupReservationServices.deleteAppointmentGroupReservationFromDB(
    req.params.id,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment Group reservation deleted succesfully',
  );
});

export const AppointmentGroupReservationController = {
  createAppointmentGroupReservation,
  createAppointmentGroupReservationByUser,
  getUserAppointmentGroupReservationList,
  getAllAppointmentGroupReservation,
  getSingleAppointmentGroupReservation,
  updateAppointmentGroupReservation,
  deleteAppointmentGroupReservation,
};
