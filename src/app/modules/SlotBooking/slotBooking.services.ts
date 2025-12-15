import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISlotBooking } from './slotBooking.interface';
import { SlotBooking } from './slotBooking.model';
import { FacilityReservation } from '../FacilityReservation/facilityReservation.model';

// const createSlotBookingIntoDB = async (payload: ISlotBooking) => {
//   // Step 1: Parse time range
//   const parseTime = (timeRange: string): [number, number] => {
//     const [startTime, endTime] = timeRange.split(' - ');
//     const parseSingleTime = (timeStr: string): number => {
//       const [time, modifier] = timeStr.split(' ');
//       let [hours, minutes] = time.split(':').map(Number);

//       if (modifier === 'PM' && hours !== 12) hours += 12;
//       if (modifier === 'AM' && hours === 12) hours = 0;

//       return hours * 60 + minutes;
//     };
//     return [parseSingleTime(startTime), parseSingleTime(endTime)];
//   };

//   const [payloadStart, payloadEnd] = parseTime(payload.time_slot);

//   // Step 2: Check existing slots in SlotBooking (carted slots)
//   const existingCartedSlots = await SlotBooking.find({
//     training: payload.training,
//     date: payload.date,
//     lane: payload.lane,
//   });

//   for (const slot of existingCartedSlots) {
//     const [slotStart, slotEnd] = parseTime(slot.time_slot);
//     if (payloadStart < slotEnd && payloadEnd > slotStart) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Slot is already in cart');
//     }
//   }

//   // Step 3: Check reserved slots from FacilityReservation
//   const reservedSlots = await FacilityReservation.aggregate([
//     { $unwind: '$bookings' },
//     {
//       $match: {
//         'bookings.date': payload.date,
//         'bookings.lane': payload.lane,
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         time_slot: '$bookings.time_slot',
//       },
//     },
//   ]);
//   for (const slot of reservedSlots) {
//     const [slotStart, slotEnd] = parseTime(slot.time_slot);
//     if (payloadStart < slotEnd && payloadEnd > slotStart) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Slot is already booked');
//     }
//   }

//   // Step 4: Create the new booking
//   const result = await SlotBooking.create(payload);

//   if (!result) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create slot booking');
//   }

//   return result;
// };

const createSlotBookingIntoDB = async (payload: ISlotBooking) => {
  const parseTime = (timeRange: string): [number, number] => {
    const [startTime, endTime] = timeRange.split(' - ');
    const parseSingleTime = (timeStr: string): number => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier.toUpperCase() === 'PM' && hours !== 12) hours += 12;
      if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };
    return [parseSingleTime(startTime), parseSingleTime(endTime)];
  };

  const [payloadStart, payloadEnd] = parseTime(payload.time_slot);
  const lanesToCheck =
    payload.lane === 'Open Arena'
      ? ['Open Arena', 'Lane 1', 'Lane 2', 'Lane 3']
      : [payload.lane, 'Open Arena'];
  const existingCartedSlots = await SlotBooking.find({
    training: payload.training,
    date: payload.date,
    lane: { $in: lanesToCheck },
  });
  const reservedSlots = await FacilityReservation.aggregate([
    { $unwind: '$bookings' },
    {
      $match: {
        'bookings.date': payload.date,
        'bookings.lane': { $in: lanesToCheck },
      },
    },
    { $project: { _id: 0, time_slot: '$bookings.time_slot' } },
  ]);

  const isOverlapping = (
    newStart: number,
    newEnd: number,
    existingStart: number,
    existingEnd: number,
  ) => {
    return newStart < existingEnd && newEnd > existingStart;
  };

  for (const slot of [...existingCartedSlots, ...reservedSlots]) {
    const [slotStart, slotEnd] = parseTime(slot.time_slot);
    if (isOverlapping(payloadStart, payloadEnd, slotStart, slotEnd)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Slot is already booked or in cart',
      );
    }
  }

  const result = await SlotBooking.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create slot booking');
  }

  return result;
};

const getSlotBookingsFromDB = async (query: any) => {
  const { date, lane } = query;

  let laneCondition;

  if (lane === 'Open Arena') {
    laneCondition = { $in: ['Open Arena', 'Lane 1', 'Lane 2', 'Lane 3'] };
  } else {
    laneCondition = { $in: [lane, 'Open Arena'] };
  }

  const result = await SlotBooking.find({
    date,
    lane: laneCondition,
  });

  return result;
};

// const getSlotBookingsFromDB = async (query: Record<string, unknown>) => {
//   const result = await SlotBooking.find(query);
//   return result;
// };

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
