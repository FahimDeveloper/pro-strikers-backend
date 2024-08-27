import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
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
    AppointmentSchedule.find().populate([
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .search(['appointment_name'])
    .filter()
    .paginate();
  const result = await appointmentQuery?.modelQuery;
  const count = await appointmentQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleAppointmentFromDB = async (id: string) => {
  const result = await AppointmentSchedule.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Could not find the appointment',
    );
  }
  return result;
};

const deleteAppointmentFromDB = async (id: string) => {
  const result = await AppointmentSchedule.findByIdAndDelete(id);
  return result;
};

export const AppointmentScheduleServices = {
  createAppointmentIntoDB,
  updateAppointmentIntoDB,
  getAllAppointmentsFromDB,
  getSingleAppointmentFromDB,
  deleteAppointmentFromDB,
};
