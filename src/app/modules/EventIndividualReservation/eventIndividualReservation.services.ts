import QueryBuilder from '../../builder/QueryBuilder';
import catchAsync from '../../utils/catchAsync';
import { IEventIndividualReservation } from './eventIndividualReservation.interface';
import { EventIndividualReservation } from './eventIndividualReservation.model';

const createEventIndividualReservationIntoDB = async (
  payload: IEventIndividualReservation,
) => {
  const result = await EventIndividualReservation.create(payload);
  return result;
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
