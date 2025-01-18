import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventGroupReservationServices } from './eventGroupReservation.services';

const createEventGroupReservationByAdmin = catchAsync(async (req, res) => {
  await EventGroupReservationServices.createEventGroupReservationByAdminIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const createEventGroupReservationByuser = catchAsync(async (req, res) => {
  await EventGroupReservationServices.createEventGroupReservationByUserIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const updateEventGroupReservation = catchAsync(async (req, res) => {
  await EventGroupReservationServices.updateEventGroupReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Event Group reservation was updated successfully',
  );
});

const getAllEventGroupReservations = catchAsync(async (req, res) => {
  const { result, count } =
    await EventGroupReservationServices.getAllEventGroupReservationsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Event Group reservations fetched successfully',
    result,
    count,
  );
});

const getSingleEventGroupReservation = catchAsync(async (req, res) => {
  const result =
    await EventGroupReservationServices.getSingleEventGroupReservationFromDB(
      req.params.id,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Event Group reservation retrieved successfully',
    result,
  );
});

const getUserEventGroupReservationList = catchAsync(async (req, res) => {
  const { result, count } =
    await EventGroupReservationServices.getUserEventGroupReservationListFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'User event group reservations fetched successfully',
    result,
    count,
  );
});

const deleteEventGroupReservation = catchAsync(async (req, res) => {
  await EventGroupReservationServices.deleteEventGroupReservationFromDB(
    req.params.id,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Event Group reservation deleted successfully',
  );
});

export const EventGroupReservationController = {
  createEventGroupReservationByAdmin,
  updateEventGroupReservation,
  getAllEventGroupReservations,
  getSingleEventGroupReservation,
  deleteEventGroupReservation,
  createEventGroupReservationByuser,
  getUserEventGroupReservationList,
};
