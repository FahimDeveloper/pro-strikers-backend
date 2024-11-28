import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotBookingServices } from './slotBooking.services';

const createSlotBooking = catchAsync(async (req, res) => {
  const result = await SlotBookingServices.createSlotBookingIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Booked successfully', result);
});

const getSlotBookings = catchAsync(async (req, res) => {
  const result = await SlotBookingServices.getSlotBookingsFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Slot fetched successfully', result);
});

const deleteSlotBooking = catchAsync(async (req, res) => {
  const result = await SlotBookingServices.deleteSlotBookingFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Slot deleted successfully', result);
});

const deleteSlotsBooking = catchAsync(async (req, res) => {
  await SlotBookingServices.deleteSlotsBookingFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Slots deleted successfully');
});

export const SlotBookingController = {
  createSlotBooking,
  getSlotBookings,
  deleteSlotBooking,
  deleteSlotsBooking,
};
