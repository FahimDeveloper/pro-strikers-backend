import QueryBuilder from '../../builder/QueryBuilder';
import { IEvent } from './events.interface';
import { Event } from './events.model';

const createEventIntoDB = async (payload: IEvent) => {
  const result = await Event.create(payload);
  return result;
};

const updateEventIntoDB = async (id: string, payload: Partial<IEvent>) => {
  const result = await Event.findByIdAndUpdate(id, payload);
  return result;
};

const getAllEventsFromDB = async (query: Record<string, unknown>) => {
  const eventsQuery = new QueryBuilder(Event.find(), query)
    .search(['event_name'])
    .filter()
    .paginate();
  const result = await eventsQuery?.modelQuery;
  const count = await eventsQuery?.countTotal();
  return { result, count };
};

const getSingleEventFromDB = async (id: string) => {
  const result = await Event.findById(id);
  return result;
};

const deleteEventFromDB = async (id: string) => {
  const result = await Event.findByIdAndDelete(id);
  return result;
};

export const EventServices = {
  createEventIntoDB,
  updateEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  deleteEventFromDB,
};
