import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Event } from '../Events/events.model';
import {
  IEventIndividualReservation,
  IEventIndividualReservationRequest,
} from './eventIndividualReservation.interface';
import { EventIndividualReservation } from './eventIndividualReservation.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import moment from 'moment';
import TournamentPayment from '../TournamentPayment/tournamentPayment.model';
import { User } from '../User/user.model';

const createEventIndividualReservationByAdminIntoDB = async (
  payload: IEventIndividualReservationRequest,
) => {
  const { event_data, payment_info } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user = await User.findOne({ email: event_data?.email });
    if (!user) {
      throw new Error('User not found, Please check the email is valid or not');
    }
    const checkEvent = await Event.findOne({
      _id: event_data.event,
      sport: event_data.sport,
      event_type: 'individual',
    });
    if (!checkEvent) {
      throw new Error('Event not found, Please check event Id and event sport');
    }
    const endDate = new Date(checkEvent?.registration_end);
    if (new Date().getDate() > endDate.getDate()) {
      throw new Error(
        `This event registration period has been closed ${moment(endDate).format('dddd, MMMM Do YYYY')}`,
      );
    }
    if (checkEvent.allowed_registrations === checkEvent.registration) {
      throw new Error('Event is fully registered, please choose another event');
    }
    await Event.findByIdAndUpdate(
      event_data.event,
      { $inc: { registration: 1 } },
      { new: true, runValidators: true, session },
    );
    const payment = await TournamentPayment.create([payment_info], {
      session,
    });
    const createPayload = {
      ...event_data,
      user: user?._id,
      payment: payment[0]._id,
    };
    await EventIndividualReservation.create([createPayload], {
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
      error?.message || 'Event registration failed',
    );
  }
};

const createEventIndividualReservationByUserIntoDB = async (
  payload: IEventIndividualReservationRequest,
) => {
  const { event_data, payment_info } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const checkEvent = await Event.findOne({
      _id: event_data.event,
      sport: event_data.sport,
      event_type: 'individual',
    });
    if (!checkEvent) {
      throw new Error('Event not found, Please check event Id and event sport');
    }
    const endDate = new Date(checkEvent?.registration_end);
    if (new Date().getDate() > endDate.getDate()) {
      throw new Error(
        `This event registration period has been closed ${moment(endDate).format('dddd, MMMM Do YYYY')}`,
      );
    }
    if (checkEvent.allowed_registrations === checkEvent.registration) {
      throw new Error('Event is fully registered, please choose another event');
    }
    await Event.findByIdAndUpdate(
      event_data.event,
      { $inc: { registration: 1 } },
      { new: true, runValidators: true, session },
    );
    const payment = await TournamentPayment.create([payment_info], {
      session,
    });
    const createPayload = {
      ...event_data,
      payment: payment[0]._id,
    };
    await EventIndividualReservation.create([createPayload], {
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
      error?.message || 'Event registration failed',
    );
  }
};

const getAllEventIndividualReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const EventIndividualReservationQuery = new QueryBuilder(
    EventIndividualReservation.find().populate([
      {
        path: 'event',
      },
      {
        path: 'user',
      },
    ]),
    query,
  )
    .search(['email'])
    .filter()
    .paginate();
  const result = await EventIndividualReservationQuery.modelQuery;
  const count = await EventIndividualReservationQuery.countTotal();
  return {
    count,
    result,
  };
};

const getSingleEventIndividualReservationFromDB = async (id: string) => {
  const result = await EventIndividualReservation.findById(id);
  return result;
};

const getUserEventIndividualReservationListFromDB = async (
  query: Record<string, unknown>,
) => {
  const EventIndividualReservationQuery = new QueryBuilder(
    EventIndividualReservation.find().populate('event'),
    query,
  )
    .filter()
    .paginate();
  const result = await EventIndividualReservationQuery.modelQuery;
  const count = await EventIndividualReservationQuery.countTotal();
  return {
    count,
    result,
  };
};

const deleteEventIndividualReservationFromDB = async (id: string) => {
  const result = await EventIndividualReservation.findByIdAndDelete(id);
  return result;
};

export const EventIndividualReservationServices = {
  createEventIndividualReservationByAdminIntoDB,
  createEventIndividualReservationByUserIntoDB,
  getUserEventIndividualReservationListFromDB,
  getAllEventIndividualReservationsFromDB,
  getSingleEventIndividualReservationFromDB,
  deleteEventIndividualReservationFromDB,
};
