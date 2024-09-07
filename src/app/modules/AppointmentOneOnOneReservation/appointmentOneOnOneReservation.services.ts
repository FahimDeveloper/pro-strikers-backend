import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SlotBooking } from '../SlotBooking/slotBooking.model';
import {
  IAppointmentOneOnOneReservation,
  IAppointmentOneOnOneReservationByUser,
} from './appointmentOneOnOneReservation.interface';
import { AppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.model';
import Payment from '../Payment/payment.modal';

const createAppointmentOneOnOneReservationIntoDB = async (
  id: string,
  payload: IAppointmentOneOnOneReservation,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await SlotBooking.deleteMany(
      {
        user: id,
        training: payload.appointment,
      },
      session,
    );
    await AppointmentOneOnOneReservation.create(payload);
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error?.message || 'Failed to create reservation');
  }
};

const createAppointmentOneOnOneReservationByUserIntoDB = async (
  id: string,
  payload: IAppointmentOneOnOneReservationByUser,
) => {
  const { appointment_data, payment_info } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await SlotBooking.deleteMany(
      {
        user: id,
        training: appointment_data.appointment,
      },
      session,
    );
    await AppointmentOneOnOneReservation.create([appointment_data], {
      session,
    });
    await Payment.create([payment_info], { session });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error?.message || 'Failed to create reservation');
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
    .search(['email', 'phone'])
    .filter()
    .paginate();
  const result = await appointmentOneOnOneReservationQuery?.modelQuery;
  const count = await appointmentOneOnOneReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getUserAppointmentOneOnOneReservationListFromDB = async (
  email: string,
) => {
  const result = await AppointmentOneOnOneReservation.find({
    email: email,
  }).populate('appointment');
  return result;
};

const getSingleAppointmentOneOnOneReservationFromDB = async (id: string) => {
  const result = await AppointmentOneOnOneReservation.findById(id);
  return result;
};

const deleteAppointmentOneOnOneReservationFromDB = async (id: string) => {
  console.log(id);
  const result = await AppointmentOneOnOneReservation.findByIdAndDelete(id);
  return result;
};

export const AppointmentOneOnOneReservationServices = {
  createAppointmentOneOnOneReservationIntoDB,
  createAppointmentOneOnOneReservationByUserIntoDB,
  updateAppointmentOneOnOneReservationIntoDB,
  getAllAppointmentOneOnOneReservationsFromDB,
  getSingleAppointmentOneOnOneReservationFromDB,
  getUserAppointmentOneOnOneReservationListFromDB,
  deleteAppointmentOneOnOneReservationFromDB,
  getAppointmentOneOnOneReservationSlotsFromDB,
};
