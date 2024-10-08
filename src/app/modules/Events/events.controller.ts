import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventServices } from './events.services';

const createEvent = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await EventServices.createEventIntoDB(req.body, file);
  sendResponse(res, httpStatus.CREATED, 'Event created successfully', result);
});

const getAllEvents = catchAsync(async (req, res) => {
  const { result, count } = await EventServices.getAllEventsFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Events fetched successfully',
    result,
    count,
  );
});

const getSingleEvent = catchAsync(async (req, res) => {
  const result = await EventServices.getSingleEventFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Event fetched successfully', result);
});

const getEventById = catchAsync(async (req, res) => {
  const result = await EventServices.getEventsByIdFromDB(req.body);
  sendResponse(res, httpStatus.OK, 'Event fetched successfully', result);
});

const updateEvent = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await EventServices.updateEventIntoDB(
    req.params.id,
    req.body,
    file,
  );
  sendResponse(res, httpStatus.OK, 'Event updated successfully', result);
});

const deleteEvent = catchAsync(async (req, res) => {
  await EventServices.deleteEventFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Event deleted successfully');
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  getEventById,
};
