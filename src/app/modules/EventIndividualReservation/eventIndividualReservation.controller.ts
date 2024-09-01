import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventIndividualReservationServices } from './eventIndividualReservation.services';

const createEventIndividualReservation = catchAsync(async (req, res) => {
  await EventIndividualReservationServices.createEventIndividualReservationIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const updateEventIndividualReservation = catchAsync(async (req, res) => {
  await EventIndividualReservationServices.updateEventIndividualReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Event individual reservation was updated successfully',
  );
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
  createEventIndividualReservation,
  updateEventIndividualReservation,
  getAllEventIndividualReservations,
  getSingleEventIndividualReservation,
  deleteEventIndividualReservation,
};
