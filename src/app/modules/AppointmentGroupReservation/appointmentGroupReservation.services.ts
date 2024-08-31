import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { IAppointmentGroupReservation } from './appointmentGroupReservation.interface';
import { AppointmentGroupReservation } from './appointmentGroupReservation.model';
import { GroupAppointmentSchedule } from '../GroupAppointmentSchedule/groupAppointmentSchedule.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createAppointmentGroupReservationIntoDB = async (
  payload: IAppointmentGroupReservation,
) => {
  const date = new Date(payload.date);
  const appointment = await GroupAppointmentSchedule.findById(
    payload.appointment,
  );
  if (!appointment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Training not found');
  }
  const count = await AppointmentGroupReservation.find({
    _id: appointment._id,
    day: date,
  }).countDocuments();
  if (count >= appointment.capacity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Training capacity exceeded');
  }
  const result = await AppointmentGroupReservation.create(payload);
  return result;
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
};