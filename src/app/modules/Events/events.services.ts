import QueryBuilder from '../../builder/QueryBuilder';
import { deleteImageIntoCloduinary } from '../../utils/deleteImageFromCloudinary';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { IEvent } from './events.interface';
import { Event } from './events.model';

const createEventIntoDB = async (payload: IEvent, file: any) => {
  const { url } = await uploadImageIntoCloduinary(file);
  const result = await Event.create({ ...payload, image: url });
  return result;
};

const updateEventIntoDB = async (
  id: string,
  payload: Partial<IEvent>,
  file: any,
) => {
  let result;
  if (file?.path) {
    const { url } = await uploadImageIntoCloduinary(file);
    result = await Event.findByIdAndUpdate(id, {
      ...payload,
      image: url,
    });
  } else {
    result = await Event.findByIdAndUpdate(id, payload);
  }
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
  const { image }: { image: string } = await Event.findById(id).select('image');
  await deleteImageIntoCloduinary(image);
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
