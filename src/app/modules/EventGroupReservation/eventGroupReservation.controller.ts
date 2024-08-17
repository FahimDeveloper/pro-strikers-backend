import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventGroupReservationServices } from './eventGroupReservation.services';

const createEventGroupReservation = catchAsync(async (req, res) => {
  await EventGroupReservationServices.createEventGroupReservationIntoDB(
    req.body,
  );
  sendResponse(
    res,
    httpStatus.CREATED,
    'Event Group reservation created successfully',
  );
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
  const result =
    await EventGroupReservationServices.getAllEventGroupReservationsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Event Group reservations fetched successfully',
    result,
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
  createEventGroupReservation,
  updateEventGroupReservation,
  getAllEventGroupReservations,
  getSingleEventGroupReservation,
  deleteEventGroupReservation,
};
