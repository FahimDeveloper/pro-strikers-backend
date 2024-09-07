import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppointmentOneOnOneReservationServices } from './appointmentOneOnOneReservation.services';

const createAppointmentOneOnOneReservation = catchAsync(async (req, res) => {
  await AppointmentOneOnOneReservationServices.createAppointmentOneOnOneReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const createAppointmentOneOnOneReservationByUser = catchAsync(
  async (req, res) => {
    await AppointmentOneOnOneReservationServices.createAppointmentOneOnOneReservationByUserIntoDB(
      req.params.id,
      req.body,
    );
    sendResponse(res, httpStatus.CREATED, 'Reservation success');
  },
);

const getUserAppointmentOneOnOneReservationList = catchAsync(
  async (req, res) => {
    const result =
      await AppointmentOneOnOneReservationServices.getUserAppointmentOneOnOneReservationListFromDB(
        req.params.email,
      );
    sendResponse(
      res,
      httpStatus.OK,
      'User appointment Group reservation list fetch succesfully',
      result,
    );
  },
);

const getAppointmentOneOnOneReservationSlots = catchAsync(async (req, res) => {
  const result =
    await AppointmentOneOnOneReservationServices.getAppointmentOneOnOneReservationSlotsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment one on one reservation slots fetch succesfully',
    result,
  );
});

const getAllAppointmentOneOnOneReservations = catchAsync(async (req, res) => {
  const { count, result } =
    await AppointmentOneOnOneReservationServices.getAllAppointmentOneOnOneReservationsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment One On One reservations fetch succesfully',
    result,
    count,
  );
});

const getSingleAppointmentOneOnOneReservation = catchAsync(async (req, res) => {
  const result =
    await AppointmentOneOnOneReservationServices.getSingleAppointmentOneOnOneReservationFromDB(
      req.params.id,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment One On One reservation fetch succesfully',
    result,
  );
});

const updateAppointmentOneOnOneReservation = catchAsync(async (req, res) => {
  await AppointmentOneOnOneReservationServices.updateAppointmentOneOnOneReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment One On One reservation updated succesfully',
  );
});

const deleteAppointmentOneOnOneReservation = catchAsync(async (req, res) => {
  await AppointmentOneOnOneReservationServices.deleteAppointmentOneOnOneReservationFromDB(
    req.params.id,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Appointment One On One reservation deleted succesfully',
  );
});

export const AppointmentOneOnOneReservationController = {
  createAppointmentOneOnOneReservation,
  createAppointmentOneOnOneReservationByUser,
  getUserAppointmentOneOnOneReservationList,
  getAllAppointmentOneOnOneReservations,
  getSingleAppointmentOneOnOneReservation,
  updateAppointmentOneOnOneReservation,
  deleteAppointmentOneOnOneReservation,
  getAppointmentOneOnOneReservationSlots,
};
