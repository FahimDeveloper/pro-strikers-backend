import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISlotBooking } from './slotBooking.interface';
import { SlotBooking } from './slotBooking.model';

const createSlotBookingIntoDB = async (payload: ISlotBooking) => {
  const existingSlots = await SlotBooking.find({
    training: payload.training,
    date: payload.date,
    lane: payload.lane,
  });

  // Step 2: Helper function to parse time ranges
  const parseTime = (timeRange: string): [number, number] => {
    const [startTime, endTime] = timeRange.split(' - ');
    const parseSingleTime = (timeStr: string): number => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      return hours * 60 + minutes;
    };
    return [parseSingleTime(startTime), parseSingleTime(endTime)];
  };

  const [payloadStart, payloadEnd] = parseTime(payload.time_slot);

  for (const slot of existingSlots) {
    const [slotStart, slotEnd] = parseTime(slot.time_slot);
    if (payloadStart < slotEnd && payloadEnd > slotStart) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Slot is already booked');
    }
  }

  const result = await SlotBooking.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create slot booking');
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
