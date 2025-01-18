import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Event } from '../Events/events.model';
import {
  IEventGroupReservation,
  IEventGroupReservationRequest,
} from './eventGroupReservation.interface';
import { EventGroupReservation } from './eventGroupReservation.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import moment from 'moment';
import TournamentPayment from '../TournamentPayment/tournamentPayment.model';
import { User } from '../User/user.model';

const createEventGroupReservationByAdminIntoDB = async (
  payload: IEventGroupReservationRequest,
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
      event_type: 'group',
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
    await EventGroupReservation.create([createPayload], {
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

const createEventGroupReservationByUserIntoDB = async (
  payload: IEventGroupReservationRequest,
) => {
  const { event_data, payment_info } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const checkEvent = await Event.findOne({
      _id: event_data.event,
      sport: event_data.sport,
      event_type: 'group',
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
    await EventGroupReservation.create([createPayload], {
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

const updateEventGroupReservationIntoDB = async (
  id: string,
  payload: Partial<IEventGroupReservation>,
) => {
  const result = await EventGroupReservation.findByIdAndUpdate(id, payload);
  return result;
};

const getAllEventGroupReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const EventGroupReservationQuery = new QueryBuilder(
    EventGroupReservation.find().populate([
      {
        path: 'event',
      },
      {
        path: 'user',
      },
    ]),
    query,
  )
    .search(['team_name', 'email'])
    .filter()
    .paginate();
  const result = await EventGroupReservationQuery.modelQuery;
  const count = await EventGroupReservationQuery.countTotal();
  return {
    count,
    result,
  };
};

const getUserEventGroupReservationListFromDB = async (
  query: Record<string, unknown>,
) => {
  const EventGroupReservationQuery = new QueryBuilder(
    EventGroupReservation.find().populate('event'),
    query,
  )
    .filter()
    .paginate();
  const result = await EventGroupReservationQuery.modelQuery;
  const count = await EventGroupReservationQuery.countTotal();
  return {
    count,
    result,
  };
};

const getSingleEventGroupReservationFromDB = async (id: string) => {
  const result = await EventGroupReservation.findById(id);
  return result;
};

const deleteEventGroupReservationFromDB = async (id: string) => {
  const result = await EventGroupReservation.findByIdAndDelete(id);
  return result;
};

export const EventGroupReservationServices = {
  createEventGroupReservationByAdminIntoDB,
  updateEventGroupReservationIntoDB,
  getAllEventGroupReservationsFromDB,
  getSingleEventGroupReservationFromDB,
  getUserEventGroupReservationListFromDB,
  createEventGroupReservationByUserIntoDB,
  deleteEventGroupReservationFromDB,
};
