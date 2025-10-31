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
import AppointmentPayment from '../AppointmentPayment/appointmentPayment.model';
import { User } from '../User/user.model';
import Notification from '../Notification/notification.modal';
import { io } from '../../../server';

const createAppointmentGroupReservationByAdminIntoDB = async (
  payload: IAppointmentGroupReservationByUser,
) => {
  const session = await mongoose.startSession();
  const { appointment_data, payment_info } = payload;
  try {
    session.startTransaction();
    const user = await User.findOne({ email: appointment_data?.email });
    if (!user) {
      throw new Error('User not found, Please check the email is valid or not');
    }
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
    const payment = await AppointmentPayment.create([payment_info], {
      session,
    });
    const careatePayload = {
      ...appointment_data,
      user: user?._id,
      payment: payment[0]._id,
    };
    await AppointmentGroupReservation.create([careatePayload], { session });
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
    const payment = await AppointmentPayment.create([payment_info], {
      session,
    });
    const careatePayload = {
      ...appointment_data,
      payment: payment[0]._id,
    };
    await AppointmentGroupReservation.create([careatePayload], { session });
    await Notification.create(
      [
        {
          title: 'New Group Appointment Reservation',
          message: `A new group appointment reservation booked`,
          type: 'group-appointment',
        },
      ],
      { session },
    );
    await session.commitTransaction();
    await session.endSession();
    io.emit('notification', 'new-notification');
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

const getAllAppointmentGroupReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const appointmentGroupReservationQuery = new QueryBuilder(
    AppointmentGroupReservation.find().populate([
      {
        path: 'user',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
      {
        path: 'appointment',
      },
      {
        path: 'payment',
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

const getAcademyAllOwnAppointmentGroupReservationsFromDB = async (
  academy: string,
  query: Record<string, unknown>,
) => {
  const appointmentGroupReservationQuery = new QueryBuilder(
    AppointmentGroupReservation.find({ academy: academy }).populate([
      {
        path: 'user',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
      {
        path: 'appointment',
      },
      {
        path: 'payment',
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

const getUserAppointmentGroupReservationListFromDB = async (
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
      },
      {
        path: 'payment',
      },
    ]),
    query,
  )
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
  createAppointmentGroupReservationByAdminIntoDB,
  getAllAppointmentGroupReservationsFromDB,
  createAppointmentGroupReservationByUserIntoDB,
  getUserAppointmentGroupReservationListFromDB,
  getSingleAppointmentGroupReservationFromDB,
  deleteAppointmentGroupReservationFromDB,
  getAcademyAllOwnAppointmentGroupReservationsFromDB,
};
