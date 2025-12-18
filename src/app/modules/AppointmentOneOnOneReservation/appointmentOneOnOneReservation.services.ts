import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SlotBooking } from '../SlotBooking/slotBooking.model';
import { IAppointmentOneOnOneReservationRequest } from './appointmentOneOnOneReservation.interface';
import { AppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import AppointmentPayment from '../AppointmentPayment/appointmentPayment.model';
import { User } from '../User/user.model';
import Notification from '../Notification/notification.modal';
import { io } from '../../../server';

const createAppointmentOneOnOneReservationByAdminIntoDB = async (
  id: string,
  payload: IAppointmentOneOnOneReservationRequest,
) => {
  const { appointment_data, payment_info } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user = await User.findOne({ email: appointment_data?.email });
    if (!user) {
      throw new Error('User not found, Please check the email is valid or not');
    }
    await SlotBooking.deleteMany(
      {
        user: new mongoose.Types.ObjectId(id),
        training: new mongoose.Types.ObjectId(appointment_data.appointment),
      },
      session,
    );
    const payment = await AppointmentPayment.create([payment_info], {
      session,
    });
    const createPayload = {
      ...appointment_data,
      user: user?._id,
      payment: payment[0]._id,
    };
    await AppointmentOneOnOneReservation.create([createPayload], {
      session,
    });
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
  payload: IAppointmentOneOnOneReservationRequest,
) => {
  const { appointment_data, payment_info } = payload;
  // const user = await User.findById(id);
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
    // if (
    //   user?.membership &&
    //   user?.package_name === 'youth training membership' &&
    //   user?.credit_balance
    // ) {
    //   let newSessionCredit: string;
    //   const sessionCredit = user.credit_balance.session_credit;
    //   newSessionCredit = Math.max(
    //     Number(sessionCredit) - appointment_data?.bookings?.length,
    //     0,
    //   ).toString();
    //   await User.findByIdAndUpdate(id, {
    //     credit_balance: {
    //       session_credit: newSessionCredit,
    //     },
    //   });
    // }
    const payment = await AppointmentPayment.create([payment_info], {
      session,
    });
    const createPayload = {
      ...appointment_data,
      payment: payment[0]._id,
    };
    await AppointmentOneOnOneReservation.create([createPayload], {
      session,
    });
    await Notification.create(
      [
        {
          title: 'Appointment Reservation',
          message: `A new one on one appointment reservation booked`,
          type: 'one-appointment',
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
    throw new Error(error?.message || 'Failed to create reservation');
  }
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
        path: 'user',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
      {
        path: 'appointment',
        select: 'appointment_name duration price description',
      },
      {
        path: 'payment',
      },
    ]),
    query,
  )
    .search(['email'])
    .filter()
    .paginate();
  const result = await appointmentOneOnOneReservationQuery?.modelQuery;
  const count = await appointmentOneOnOneReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getAcademyAllOwnAppointmentOneOnOneReservationsFromDB = async (
  academy: string,
  query: Record<string, unknown>,
) => {
  const appointmentOneOnOneReservationQuery = new QueryBuilder(
    AppointmentOneOnOneReservation.find({ academy: academy }).populate([
      {
        path: 'user',
      },
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
      {
        path: 'appointment',
        select: 'appointment_name duration price description',
      },
      {
        path: 'payment',
      },
    ]),
    query,
  )
    .search(['email'])
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
      {
        path: 'user',
      },
      {
        path: 'payment',
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
  createAppointmentOneOnOneReservationByAdminIntoDB,
  createAppointmentOneOnOneReservationByUserIntoDB,
  getAllAppointmentOneOnOneReservationsFromDB,
  getSingleAppointmentOneOnOneReservationFromDB,
  getUserAppointmentOneOnOneReservationListFromDB,
  deleteAppointmentOneOnOneReservationFromDB,
  getAppointmentOneOnOneReservationSlotsFromDB,
  getAcademyAllOwnAppointmentOneOnOneReservationsFromDB,
};
