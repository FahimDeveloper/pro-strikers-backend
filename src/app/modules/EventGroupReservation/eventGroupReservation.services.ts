import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Event } from '../Events/events.model';
import {
  IEventGroupReservation,
  IEventGroupReservationByUser,
} from './eventGroupReservation.interface';
import { EventGroupReservation } from './eventGroupReservation.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import WebPayment from '../WebPayment/webPayment.modal';

const createEventGroupReservationIntoDB = async (
  payload: IEventGroupReservation,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const checkEvent = await Event.findOne({
      _id: payload.event,
      sport: payload.sport,
      event_type: 'group',
    });
    if (!checkEvent) {
      throw new Error('Event not found, Please check event Id and event sport');
    } else if (checkEvent.allowed_registrations === checkEvent.registration) {
      throw new Error('Event is fully registered, please choose another event');
    } else {
      await Event.findByIdAndUpdate(
        payload.event,
        { $inc: { registration: 1 } },
        { new: true, runValidators: true, session },
      );
      await EventGroupReservation.create([payload], { session });
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

const createEventGroupReservationByUserIntoDB = async (
  payload: IEventGroupReservationByUser,
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
    } else if (checkEvent.allowed_registrations === checkEvent.registration) {
      throw new Error('Event is fully registered, please choose another event');
    } else {
      await Event.findByIdAndUpdate(
        event_data.event,
        { $inc: { registration: 1 } },
        { new: true, runValidators: true, session },
      );
      await EventGroupReservation.create([event_data], {
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
    EventGroupReservation.find().populate('event'),
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
  createEventGroupReservationIntoDB,
  updateEventGroupReservationIntoDB,
  getAllEventGroupReservationsFromDB,
  getSingleEventGroupReservationFromDB,
  getUserEventGroupReservationListFromDB,
  createEventGroupReservationByUserIntoDB,
  deleteEventGroupReservationFromDB,
};
