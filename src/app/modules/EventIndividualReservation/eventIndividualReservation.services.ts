import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import catchAsync from '../../utils/catchAsync';
import { Event } from '../Events/events.model';
import {
  IEventIndividualReservation,
  IEventIndividualReservationByUser,
} from './eventIndividualReservation.interface';
import { EventIndividualReservation } from './eventIndividualReservation.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import WebPayment from '../WebPayment/webPayment.modal';
import moment from 'moment';

const createEventIndividualReservationIntoDB = async (
  payload: IEventIndividualReservation,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const checkEvent = await Event.findOne({
      _id: payload.event,
      sport: payload.sport,
      event_type: 'individual',
    });
    if (!checkEvent) {
      throw new Error('Event not found, Please check event Id and event sport');
    } else if (checkEvent._id) {
      const endDate = new Date(checkEvent?.registration_end);
      if (new Date().getDate() > endDate.getDate()) {
        throw new Error(
          `This event registration period has been closed ${moment(endDate).format('dddd, MMMM Do YYYY')}`,
        );
      }
    } else if (checkEvent.allowed_registrations === checkEvent.registration) {
      throw new Error('Event is fully registered, please choose another event');
    } else {
      await Event.findByIdAndUpdate(
        payload.event,
        { $inc: { registration: 1 } },
        { new: true, runValidators: true, session },
      );
      await EventIndividualReservation.create([payload], { session });
      await session.commitTransaction();
      await session.endSession();
      return;
    }
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
  payload: IEventIndividualReservationByUser,
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
    } else if (checkEvent.allowed_registrations === checkEvent.registration) {
      throw new Error('Event is fully registered, please choose another event');
    } else {
      await Event.findByIdAndUpdate(
        event_data.event,
        { $inc: { registration: 1 } },
        { new: true, runValidators: true, session },
      );
      await EventIndividualReservation.create([event_data], {
        session,
      });
      await WebPayment.create([payment_info], { session });
      await session.commitTransaction();
      await session.endSession();
      return;
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Event registration failed',
    );
  }
};

const updateEventIndividualReservationIntoDB = async (
  id: string,
  payload: Partial<IEventIndividualReservation>,
) => {
  const result = await EventIndividualReservation.findByIdAndUpdate(
    id,
    payload,
  );
  return result;
};

const getAllEventIndividualReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const EventIndividualReservationQuery = new QueryBuilder(
    EventIndividualReservation.find().populate('event'),
    query,
  )
    .search(['player_name', 'email'])
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
  createEventIndividualReservationIntoDB,
  createEventIndividualReservationByUserIntoDB,
  getUserEventIndividualReservationListFromDB,
  updateEventIndividualReservationIntoDB,
  getAllEventIndividualReservationsFromDB,
  getSingleEventIndividualReservationFromDB,
  deleteEventIndividualReservationFromDB,
};
