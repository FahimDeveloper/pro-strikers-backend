import QueryBuilder from '../../builder/QueryBuilder';
import catchAsync from '../../utils/catchAsync';
import { Event } from '../Events/events.model';
import { IEventIndividualReservation } from './eventIndividualReservation.interface';
import { EventIndividualReservation } from './eventIndividualReservation.model';

const createEventIndividualReservationIntoDB = async (
  payload: IEventIndividualReservation,
) => {
  const checkEvent = await Event.findById(payload.event);
  if (!checkEvent) {
    throw new Error('Event not found, Please enter a valid event ID');
  } else if (checkEvent.allowed_registrations === checkEvent.registration) {
    throw new Error('Event is fully registered, please choose another event');
  } else {
    const updatedCourse = await Event.findByIdAndUpdate(
      payload.event,
      { $inc: { registration: 1 } },
      { new: true, runValidators: true },
    );
    if (!updatedCourse) {
      throw new Error(
        'Failed event registration, Try again later or contact with support',
      );
    }
    const result = await EventIndividualReservation.create(payload);
    return result;
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

const deleteEventIndividualReservationFromDB = async (id: string) => {
  const result = await EventIndividualReservation.findByIdAndDelete(id);
  return result;
};

export const EventIndividualReservationServices = {
  createEventIndividualReservationIntoDB,
  updateEventIndividualReservationIntoDB,
  getAllEventIndividualReservationsFromDB,
  getSingleEventIndividualReservationFromDB,
  deleteEventIndividualReservationFromDB,
};
