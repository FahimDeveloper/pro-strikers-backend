import QueryBuilder from '../../builder/QueryBuilder';
import { Event } from '../Events/events.model';
import { IEventGroupReservation } from './eventGroupReservation.interface';
import { EventGroupReservation } from './eventGroupReservation.model';

const createEventGroupReservationIntoDB = async (
  payload: IEventGroupReservation,
) => {
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
    const result = await EventGroupReservation.create(payload);
    return result;
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
  deleteEventGroupReservationFromDB,
};
