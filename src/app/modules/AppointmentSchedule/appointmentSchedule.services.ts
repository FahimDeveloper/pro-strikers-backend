import QueryBuilder from '../../builder/QueryBuilder';
import { IAppointmentSchedule } from './appointmentSchedule.interface';
import { AppointmentSchedule } from './appointmentSchedule.model';

const createAppointmentIntoDB = async (payload: IAppointmentSchedule) => {
  const result = await AppointmentSchedule.create(payload);
  return result;
};

const updateAppointmentIntoDB = async (
  id: string,
  payload: Partial<IAppointmentSchedule>,
) => {
  const result = await AppointmentSchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllAppointmentsFromDB = async (query: Record<string, unknown>) => {
  const appointmentQuery = new QueryBuilder(
    AppointmentSchedule.find().populate('trainer').select('first_name'),
    query,
  )
    .search(['appointment_name'])
    .filter()
    .paginate();
  const result = await appointmentQuery?.modelQuery;
  const count = await appointmentQuery?.countTotal();
  return {
    count,
    ...result,
  };
};

const getSingleAppointmentFromDB = async (id: string) => {
  const result = await AppointmentSchedule.findById(id);
  return result;
};

const deleteAppointmentFromDB = async (id: string) => {
  const result = await AppointmentSchedule.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  return result;
};

export const AppointmentScheduleServices = {
  createAppointmentIntoDB,
  updateAppointmentIntoDB,
  getAllAppointmentsFromDB,
  getSingleAppointmentFromDB,
  deleteAppointmentFromDB,
};
