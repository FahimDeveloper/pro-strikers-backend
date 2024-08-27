import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SlotBooking } from '../SlotBooking/slotBooking.model';
import { IAppointmentGroupReservation } from './appointmentGroupReservation.interface';
import { AppointmentGroupReservation } from './appointmentGroupReservation.model';

const createAppointmentGroupReservationIntoDB = async (
  id: string,
  payload: IAppointmentGroupReservation,
) => {
  const deleteSlots = await SlotBooking.deleteMany({
    user: id,
    training: payload.appointment,
  });
  if (deleteSlots) {
    const result = await AppointmentGroupReservation.create(payload);
    return result;
  } else {
    throw new Error('Failed your appointment reservation');
  }
};

const updateAppointmentGroupReservationIntoDB = async (
  id: string,
  payload: Partial<IAppointmentGroupReservation>,
) => {
  const result = await AppointmentGroupReservation.findByIdAndUpdate(
    id,
    payload,
  );
  return result;
};

const getAppointmentGroupReservationSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date, training } = query;
  const result = await AppointmentGroupReservation.aggregate([
    { $unwind: '$bookings' },
    {
      $match: {
        'bookings.date': date,
        'bookings.training': new mongoose.Types.ObjectId(training as string),
      },
    },
    {
      $project: {
        _id: 0,
        date: '$bookings.date',
        time_slot: '$bookings.time_slot',
        training: '$bookings.training',
      },
    },
  ]);
  return result;
};

const getAllAppointmentGroupReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const appointmentGroupReservationQuery = new QueryBuilder(
    AppointmentGroupReservation.find().populate([
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
      {
        path: 'appointment',
        select: 'appointment_name duration',
      },
    ]),
    query,
  )
    .search(['email', 'phone'])
    .filter()
    .paginate();
  const result = await appointmentGroupReservationQuery?.modelQuery;
  const count = await appointmentGroupReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleAppointmentGroupReservationFromDB = async (id: string) => {
  const result = await AppointmentGroupReservation.findById(id);
  return result;
};

const deleteAppointmentGroupReservationFromDB = async (id: string) => {
  const result = await AppointmentGroupReservation.findByIdAndDelete(id);
  return result;
};

export const AppointmentGroupReservationServices = {
  createAppointmentGroupReservationIntoDB,
  updateAppointmentGroupReservationIntoDB,
  getAllAppointmentGroupReservationsFromDB,
  getSingleAppointmentGroupReservationFromDB,
  deleteAppointmentGroupReservationFromDB,
  getAppointmentGroupReservationSlotsFromDB,
};
