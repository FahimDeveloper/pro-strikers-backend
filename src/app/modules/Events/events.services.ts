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

const getAllEventsFromDB = async () => {
  const result = await Event.find();
  return result;
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
