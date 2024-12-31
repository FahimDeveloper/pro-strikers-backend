import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  IFacilityReservation,
  IFacilityReservationByAdmin,
  IFacilityReservationByUser,
} from './facilityReservation.interface';
import { FacilityReservation } from './facilityReservation.model';
import { SlotBooking } from '../SlotBooking/slotBooking.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../User/user.model';
import WebPayment from '../WebPayment/webPayment.modal';
import { sendRentalBookingConfirmationEmail } from '../../utils/email';

const createFacilityReservationIntoDB = async (
  id: string,
  payload: IFacilityReservationByAdmin,
) => {
  const { facility_data, amount } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await SlotBooking.deleteMany(
      {
        user: new mongoose.Types.ObjectId(id),
        training: new mongoose.Types.ObjectId(facility_data.facility),
      },
      { session },
    );
    await FacilityReservation.create([facility_data], { session });
    await sendRentalBookingConfirmationEmail({
      email: facility_data?.email,
      bookings: facility_data,
      amount: amount,
    });
    await session.commitTransaction();
    await session.endSession();
    return;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err?.message || 'Failed your facility reservation',
    );
  }
};

const createFacilityReservationByUserIntoDB = async (
  id: string,
  payload: IFacilityReservationByUser,
) => {
  const session = await mongoose.startSession();
  const { facility_data, membership_info, payment_info } = payload;
  try {
    session.startTransaction();
    await SlotBooking.deleteMany(
      {
        user: new mongoose.Types.ObjectId(id),
        training: new mongoose.Types.ObjectId(facility_data.facility),
      },
      { session },
    );
    if (membership_info) {
      await User.findByIdAndUpdate(
        membership_info.user_id,
        membership_info.membership,
        { session },
      );
    }
    await FacilityReservation.create([facility_data], { session });
    await WebPayment.create([payment_info], { session });
    await sendRentalBookingConfirmationEmail({
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
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err?.message || 'Failed your facility reservation',
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
    ]),
    query,
  )
    .search(['user_email'])
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
  createFacilityReservationIntoDB,
  updateFacilityReservationIntoDB,
  getAllFacilitiesReservationsFromDB,
  getSingleFacilityReservationFromDB,
  deleteFacilityReservationFromDB,
  getFacilityReservationSlotsFromDB,
  createFacilityReservationByUserIntoDB,
  getUserFacilitiesReservationsFromDB,
};
