import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SlotBooking } from '../SlotBooking/slotBooking.model';
import {
  IAppointmentOneOnOneReservation,
  IAppointmentOneOnOneReservationByUser,
} from './appointmentOneOnOneReservation.interface';
import { AppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.model';
import WebPayment from '../WebPayment/webPayment.modal';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createAppointmentOneOnOneReservationIntoDB = async (
  id: string,
  payload: IAppointmentOneOnOneReservation,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await SlotBooking.deleteMany(
      {
        user: new mongoose.Types.ObjectId(id),
        training: new mongoose.Types.ObjectId(payload.appointment),
      },
      session,
    );
    await AppointmentOneOnOneReservation.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Failed to create reservation',
    );
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
        user: new mongoose.Types.ObjectId(id),
        training: new mongoose.Types.ObjectId(appointment_data.appointment),
      },
      session,
    );
    await AppointmentOneOnOneReservation.create([appointment_data], {
      session,
    });
    await WebPayment.create([payment_info], { session });
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
        select: 'appointment_name duration price description',
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
      },
    ]),
    query,
  )
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
  createAppointmentOneOnOneReservationByUserIntoDB,
  updateAppointmentOneOnOneReservationIntoDB,
  getAllAppointmentOneOnOneReservationsFromDB,
  getSingleAppointmentOneOnOneReservationFromDB,
  getUserAppointmentOneOnOneReservationListFromDB,
  deleteAppointmentOneOnOneReservationFromDB,
  getAppointmentOneOnOneReservationSlotsFromDB,
};
