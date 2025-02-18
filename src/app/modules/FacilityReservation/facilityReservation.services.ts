import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  IFacilityReservation,
  IFacilityReservationRequest,
} from './facilityReservation.interface';
import { FacilityReservation } from './facilityReservation.model';
import { SlotBooking } from '../SlotBooking/slotBooking.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import {
  sendRentalBookingConfirmationEmail,
  sendRentalBookingFailedNotifyEmail,
} from '../../utils/email';
import FacilityPayment from '../FacilityPayment/facilityPayment.model';
import { User } from '../User/user.model';
import Notification from '../Notification/notification.modal';
import { io } from '../../../server';

const createFacilityReservationByAdminIntoDB = async (
  id: string,
  payload: IFacilityReservationRequest,
) => {
  const session = await mongoose.startSession();
  const { facility_data, payment_info } = payload;
  try {
    session.startTransaction();
    const user = await User.findOne({ email: facility_data?.email });
    if (!user) {
      throw new Error('User not found, Please check the email is valid or not');
    }
    await SlotBooking.deleteMany(
      {
        user: new mongoose.Types.ObjectId(id),
      },
      { session },
    );
    const payment = await FacilityPayment.create([payment_info], { session });
    const createPayload = {
      ...facility_data,
      user: user?._id,
      payment: payment[0]._id,
    };
    await FacilityReservation.create([createPayload], { session });
    // sendRentalBookingConfirmationEmail({
    //   transactionId: payment_info?.transaction_id,
    //   user: user,
    //   email: payment_info?.email,
    //   bookings: facility_data,
    //   amount: payment_info?.amount,
    // });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    await sendRentalBookingFailedNotifyEmail({
      bookings: facility_data,
      amount: payment_info?.amount,
      transactionId: payment_info?.transaction_id,
    });
    throw new AppError(httpStatus.BAD_REQUEST, err?.message);
  }
};

const createFacilityReservationByUserIntoDB = async (
  id: string,
  payload: IFacilityReservationRequest,
) => {
  const session = await mongoose.startSession();
  const { facility_data, payment_info } = payload;
  const user = await User.findById(id);
  try {
    session.startTransaction();
    await SlotBooking.deleteMany(
      {
        user: new mongoose.Types.ObjectId(id),
      },
      { session },
    );
    const payment = await FacilityPayment.create([payment_info], { session });
    const createPayload = {
      ...facility_data,
      payment: payment[0]._id,
    };
    await FacilityReservation.create([createPayload], { session });
    await Notification.create(
      [
        {
          title: 'Facility Reservation',
          message: `Facility reservation booked by ${user?.email}`,
          type: 'facility',
        },
      ],
      { session },
    );
    await session.commitTransaction();
    await session.endSession();
    sendRentalBookingConfirmationEmail({
      user: user,
      email: payment_info?.email,
      transactionId: payment_info?.transaction_id,
      bookings: facility_data,
      amount: payment_info?.amount,
    });
    io.emit('notification', 'new-notification');
    return;
  } catch (err: any) {
    console.log(err?.message);
    await session.abortTransaction();
    await session.endSession();
    await sendRentalBookingFailedNotifyEmail({
      bookings: facility_data,
      amount: payment_info?.amount,
      transactionId: payment_info?.transaction_id,
    });
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your Rental Facility booking was unsuccessful, but your payment went through. There was an issue with our processing. Please be patient; our customer support team will contact you as soon as possible to assist you further.',
    );
  }
};

const updateFacilityReservationIntoDB = async (
  id: string,
  payload: Partial<IFacilityReservation>,
) => {
  const result = await FacilityReservation.findByIdAndUpdate(id, payload);
  return result;
};

const getAllFacilitiesReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const facilityReservationQuery = new QueryBuilder(
    FacilityReservation.find().populate([
      {
        path: 'facility',
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
    .search(['email'])
    .filter()
    .paginate();
  const result = await facilityReservationQuery?.modelQuery;
  const count = await facilityReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getUserFacilitiesReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const facilityReservationQuery = new QueryBuilder(
    FacilityReservation.find().populate([
      {
        path: 'facility',
      },
      {
        path: 'payment',
      },
    ]),
    query,
  )
    .filter()
    .paginate();
  const result = await facilityReservationQuery?.modelQuery;
  const count = await facilityReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getFacilityReservationSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date, lane } = query;
  const result = await FacilityReservation.aggregate([
    { $unwind: '$bookings' },
    {
      $match: {
        'bookings.date': date,
        'bookings.lane': lane,
      },
    },
    {
      $project: {
        _id: 0,
        date: '$bookings.date',
        time_slot: '$bookings.time_slot',
        lane: '$bookings.lane',
      },
    },
  ]);
  return result;
};

const getSingleFacilityReservationFromDB = async (id: string) => {
  const result = await FacilityReservation.findById(id);
  return result;
};

const deleteFacilityReservationFromDB = async (id: string) => {
  const result = await FacilityReservation.findByIdAndDelete(id);
  return result;
};

export const FacilityReservationServices = {
  createFacilityReservationByAdminIntoDB,
  updateFacilityReservationIntoDB,
  getAllFacilitiesReservationsFromDB,
  getSingleFacilityReservationFromDB,
  deleteFacilityReservationFromDB,
  getFacilityReservationSlotsFromDB,
  createFacilityReservationByUserIntoDB,
  getUserFacilitiesReservationsFromDB,
};
