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
    await sendRentalBookingConfirmationEmail({
      transactionId: payment_info?.transaction_id,
      user: user,
      email: payment_info?.email,
      bookings: facility_data,
      amount: payment_info?.amount,
    });
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
    await sendRentalBookingConfirmationEmail({
      user: user,
      email: payment_info?.email,
      transactionId: payment_info?.transaction_id,
      bookings: facility_data,
      amount: payment_info?.amount,
    });
    await session.commitTransaction();
    await session.endSession();
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

const getReservationFrequencyByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();

  const allDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: i + 1,
    booking: 0,
  }));

  const bookings = await FacilityReservation.aggregate([
    { $unwind: '$bookings' },
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: '$bookings.date',
            format: '%Y-%m-%d',
          },
        },
      },
    },
    {
      $match: {
        bookingDate: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: '$bookingDate' },
        booking: { $sum: 1 },
      },
    },
    {
      $project: {
        date: '$_id',
        booking: 1,
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);
  const result = allDays.map(day => {
    const found = bookings.find(b => b.date === day.date);
    return found ? found : day;
  });
  return result;
};

const getReservationRevenueByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const analytics = await FacilityReservation.aggregate([
    { $unwind: '$bookings' },
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: '$bookings.date',
            format: '%Y-%m-%d',
          },
        },
      },
    },
    {
      $match: {
        bookingDate: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    },
    {
      $lookup: {
        from: 'webpayments',
        localField: 'payment',
        foreignField: '_id',
        as: 'paymentInfo',
      },
    },
    { $unwind: '$paymentInfo' },
    {
      $group: {
        _id: { sport: '$sport', paymentId: '$paymentInfo._id' },
        sport: { $first: '$sport' },
        amount: { $first: '$paymentInfo.amount' },
      },
    },
    {
      $group: {
        _id: '$sport',
        totalRevenue: { $sum: '$amount' },
      },
    },
    {
      $project: {
        type: '$_id',
        value: '$totalRevenue',
        _id: 0,
      },
    },
    { $sort: { value: -1 } },
  ]);

  return analytics;
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
  getReservationFrequencyByMonthFromDB,
  getReservationRevenueByMonthFromDB,
};
