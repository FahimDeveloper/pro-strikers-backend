import QueryBuilder from '../../builder/QueryBuilder';
import { IClassReservation } from './classReservation.interface';
import { ClassReservation } from './classReservation.model';

const createClassReservationIntoDB = async (payload: IClassReservation) => {
  const result = await ClassReservation.create(payload);
  return result;
};

const updateClassReservationIntoDB = async (
  id: string,
  payload: Partial<IClassReservation>,
) => {
  const result = await ClassReservation.findByIdAndUpdate(id, payload);
  return result;
};

const getAllClassesReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const classReservationQuery = new QueryBuilder(
    ClassReservation.find().populate('class'),
    query,
  )
    .search(['user_email'])
    .filter()
    .paginate();
  const result = await classReservationQuery?.modelQuery;
  const count = await classReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleClassReservationFromDB = async (id: string) => {
  const result = await ClassReservation.findById(id);
  return result;
};

const deleteClassReservationFromDB = async (id: string) => {
  const result = await ClassReservation.findByIdAndDelete(id);
  return result;
};

export const ClassReservationServices = {
  createClassReservationIntoDB,
  updateClassReservationIntoDB,
  getAllClassesReservationsFromDB,
  getSingleClassReservationFromDB,
  deleteClassReservationFromDB,
};
