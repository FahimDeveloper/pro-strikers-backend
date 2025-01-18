import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventIndividualReservationServices } from './eventIndividualReservation.services';

const createEventIndividualReservationByAdmin = catchAsync(async (req, res) => {
  await EventIndividualReservationServices.createEventIndividualReservationByAdminIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const createEventIndividualReservationByuser = catchAsync(async (req, res) => {
  await EventIndividualReservationServices.createEventIndividualReservationByUserIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const getAllEventIndividualReservations = catchAsync(async (req, res) => {
  const { result, count } =
    await EventIndividualReservationServices.getAllEventIndividualReservationsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Event individual reservations fetched successfully',
    result,
    count,
  );
});

const getUserEventIndividualReservationList = catchAsync(async (req, res) => {
  const { result, count } =
    await EventIndividualReservationServices.getUserEventIndividualReservationListFromDB(
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

const getSingleEventIndividualReservation = catchAsync(async (req, res) => {
  const result =
    await EventIndividualReservationServices.getSingleEventIndividualReservationFromDB(
      req.params.id,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Event individual reservation retrieved successfully',
    result,
  );
});

const deleteEventIndividualReservation = catchAsync(async (req, res) => {
  await EventIndividualReservationServices.deleteEventIndividualReservationFromDB(
    req.params.id,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Event individual reservation deleted successfully',
  );
});

export const EventIndividualReservationController = {
  createEventIndividualReservationByAdmin,
  createEventIndividualReservationByuser,
  getUserEventIndividualReservationList,
  getAllEventIndividualReservations,
  getSingleEventIndividualReservation,
  deleteEventIndividualReservation,
};
