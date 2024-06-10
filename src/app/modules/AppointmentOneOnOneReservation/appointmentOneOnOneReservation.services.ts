import QueryBuilder from '../../builder/QueryBuilder';
import { IAppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.interface';
import { AppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.model';

const createAppointmentOneOnOneReservationIntoDB = async (
  payload: IAppointmentOneOnOneReservation,
) => {
  const result = await AppointmentOneOnOneReservation.create(payload);
  return result;
};

const updateAppointmentOneOnOneReservationIntoDB = async (
  id: string,
  payload: Partial<IAppointmentOneOnOneReservation>,
) => {
  const result = await AppointmentOneOnOneReservation.findByIdAndUpdate(
    id,
    payload,
  );
  return result;
};

const getAllAppointmentOneOnOneReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const appointmentOneOnOneReservationQuery = new QueryBuilder(
    AppointmentOneOnOneReservation.find(),
    query,
  )
    .search(['user_email'])
    .filter()
    .paginate();
  const result = await appointmentOneOnOneReservationQuery?.modelQuery;
  const count = await appointmentOneOnOneReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleAppointmentOneOnOneReservationFromDB = async (id: string) => {
  const result = await AppointmentOneOnOneReservation.findById(id);
  return result;
};

const deleteAppointmentOneOnOneReservationFromDB = async (id: string) => {
  const result = await AppointmentOneOnOneReservation.findByIdAndDelete(id);
  return result;
};

export const AppointmentOneOnOneReservationServices = {
  createAppointmentOneOnOneReservationIntoDB,
  updateAppointmentOneOnOneReservationIntoDB,
  getAllAppointmentOneOnOneReservationsFromDB,
  getSingleAppointmentOneOnOneReservationFromDB,
  deleteAppointmentOneOnOneReservationFromDB,
};
