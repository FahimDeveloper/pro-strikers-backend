import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISlotBooking } from './slotBooking.interface';
import { SlotBooking } from './slotBooking.model';

const createSlotBookingIntoDB = async (payload: ISlotBooking) => {
  const findTheSlot = await SlotBooking.findOne({
    training: payload.training,
    time_slot: payload.time_slot,
    date: payload.date,
    lane: payload?.lane,
  });
  if (findTheSlot) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }
  const result = await SlotBooking.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }
  return result;
};

const getSlotBookingsFromDB = async (query: Record<string, unknown>) => {
  const result = await SlotBooking.find(query);
  return result;
};

const deleteSlotBookingFromDB = async (id: string) => {
  const result = await SlotBooking.findOneAndDelete({ id: id });
  return result;
};

const deleteSlotsBookingFromDB = async (id: string) => {
  const result = await SlotBooking.deleteMany({ user: id });
  return result;
};

export const SlotBookingServices = {
  createSlotBookingIntoDB,
  getSlotBookingsFromDB,
  deleteSlotBookingFromDB,
  deleteSlotsBookingFromDB,
};
