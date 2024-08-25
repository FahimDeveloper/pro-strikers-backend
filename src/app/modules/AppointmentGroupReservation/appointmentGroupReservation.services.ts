import QueryBuilder from '../../builder/QueryBuilder';
import { IAppointmentGroupReservation } from './appointmentGroupReservation.interface';
import { AppointmentGroupReservation } from './appointmentGroupReservation.model';

const createAppointmentGroupReservationIntoDB = async (
  payload: IAppointmentGroupReservation,
) => {
  const result = await AppointmentGroupReservation.create(payload);
  return result;
};

const updateAppointmentGroupReservationIntoDB = async (
  id: string,
  payload: Partial<IAppointmentGroupReservation>,
) => {
  const result = await AppointmentGroupReservation.findByIdAndUpdate(
    id,
    payload,
  );
  return result;
};

const getAllAppointmentGroupReservationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const appointmentGroupReservationQuery = new QueryBuilder(
    AppointmentGroupReservation.find(),
    query,
  )
    .search(['email phone'])
    .filter()
    .paginate();
  const result = await appointmentGroupReservationQuery?.modelQuery;
  const count = await appointmentGroupReservationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleAppointmentGroupReservationFromDB = async (id: string) => {
  const result = await AppointmentGroupReservation.findById(id);
  return result;
};

const deleteAppointmentGroupReservationFromDB = async (id: string) => {
  const result = await AppointmentGroupReservation.findByIdAndDelete(id);
  return result;
};

export const AppointmentGroupReservationServices = {
  createAppointmentGroupReservationIntoDB,
  updateAppointmentGroupReservationIntoDB,
  getAllAppointmentGroupReservationsFromDB,
  getSingleAppointmentGroupReservationFromDB,
  deleteAppointmentGroupReservationFromDB,
};
