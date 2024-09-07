import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  IAppointmentGroupReservation,
  IAppointmentGroupReservationByUser,
} from './appointmentGroupReservation.interface';
import { AppointmentGroupReservation } from './appointmentGroupReservation.model';
import { GroupAppointmentSchedule } from '../GroupAppointmentSchedule/groupAppointmentSchedule.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import Payment from '../Payment/payment.modal';

const createAppointmentGroupReservationIntoDB = async (
  payload: IAppointmentGroupReservation,
) => {
  const date = new Date(payload.appointment_date);
  const appointment = await GroupAppointmentSchedule.findById(
    payload.appointment,
  );
  if (!appointment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Appointment not found');
  }
  const count = await AppointmentGroupReservation.find({
    _id: appointment._id,
    day: date,
  }).countDocuments();
  if (count >= appointment.capacity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Appointment capacity exceeded');
  }
  const result = await AppointmentGroupReservation.create(payload);
  return result;
};

const createAppointmentGroupReservationByUserIntoDB = async (
  payload: IAppointmentGroupReservationByUser,
) => {
  const session = await mongoose.startSession();
  const { appointment_data, payment_info } = payload;
  try {
    session.startTransaction();
    const appointment = await GroupAppointmentSchedule.findById(
      appointment_data.appointment,
    );
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    const count = await AppointmentGroupReservation.find({
      _id: appointment._id,
      day: appointment_data.appointment_date,
    }).countDocuments();
    if (count >= appointment.capacity) {
      throw new Error('Appointment capacity exceeded');
    }
    await AppointmentGroupReservation.create([appointment_data], { session });
    await Payment.create([payment_info], { session });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Appointment registration failed',
    );
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
        select: 'appointment_name',
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

const getUserAppointmentGroupReservationListFromDB = async (email: string) => {
  const result = await AppointmentGroupReservation.find({
    email: email,
  }).populate('appointment');
  return result;
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
  createAppointmentGroupReservationByUserIntoDB,
  getUserAppointmentGroupReservationListFromDB,
  getSingleAppointmentGroupReservationFromDB,
  deleteAppointmentGroupReservationFromDB,
};
