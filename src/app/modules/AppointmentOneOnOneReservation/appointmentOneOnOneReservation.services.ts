import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SlotBooking } from '../SlotBooking/slotBooking.model';
import { IAppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.interface';
import { AppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.model';

const createAppointmentOneOnOneReservationIntoDB = async (
  id: string,
  payload: IAppointmentOneOnOneReservation,
) => {
  const deleteSlots = await SlotBooking.deleteMany({
    user: id,
    training: payload.appointment,
  });
  if (deleteSlots) {
    const result = await AppointmentOneOnOneReservation.create(payload);
    return result;
  } else {
    throw new Error('Failed your appointment reservation');
  }
};

const updateAppointmentOneOnOneReservationIntoDB = async (
  id: string,
  payload: Partial<IAppointmentOneOnOneReservation>,
) => {
  const result = await AppointmentOneOnOneReservation.findByIdAndUpdate(
    id,
    payload,
  );
  return result;
};

const getAppointmentOneOnOneReservationSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date, training } = query;
  const result = await AppointmentOneOnOneReservation.aggregate([
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

const getAllAppointmentOneOnOneReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const appointmentOneOnOneReservationQuery = new QueryBuilder(
    AppointmentOneOnOneReservation.find().populate([
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
    .search(['user_email'])
    .filter()
    .paginate();
  const result = await appointmentOneOnOneReservationQuery?.modelQuery;
  const count = await appointmentOneOnOneReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleAppointmentOneOnOneReservationFromDB = async (id: string) => {
  const result = await AppointmentOneOnOneReservation.findById(id);
  return result;
};

const deleteAppointmentOneOnOneReservationFromDB = async (id: string) => {
  const result = await AppointmentOneOnOneReservation.findByIdAndDelete(id);
  return result;
};

export const AppointmentOneOnOneReservationServices = {
  createAppointmentOneOnOneReservationIntoDB,
  updateAppointmentOneOnOneReservationIntoDB,
  getAllAppointmentOneOnOneReservationsFromDB,
  getSingleAppointmentOneOnOneReservationFromDB,
  deleteAppointmentOneOnOneReservationFromDB,
  getAppointmentOneOnOneReservationSlotsFromDB,
};
