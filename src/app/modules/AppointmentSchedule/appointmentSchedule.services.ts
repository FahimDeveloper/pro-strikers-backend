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

const getAllAppointmentsFromDB = async () => {
  const result = await AppointmentSchedule.find();
  return result;
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
