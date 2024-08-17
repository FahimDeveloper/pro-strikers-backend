import QueryBuilder from '../../builder/QueryBuilder';
import { IEventGroupReservation } from './eventGroupReservation.interface';
import { EventGroupReservation } from './eventGroupReservation.model';

const createEventGroupReservationIntoDB = async (
  payload: IEventGroupReservation,
) => {
  const result = await EventGroupReservation.create(payload);
  return result;
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
