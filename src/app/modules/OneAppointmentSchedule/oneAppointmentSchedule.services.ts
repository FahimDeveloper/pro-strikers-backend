import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IOneAppointmentSchedule } from './oneAppointmentSchedule.interface';
import { OneAppointmentSchedule } from './oneAppointmentSchedule.model';

const createAppointmentIntoDB = async (payload: IOneAppointmentSchedule) => {
  const findSport = await OneAppointmentSchedule.findOne({
    sport: payload.sport,
    trainer: payload.trainer,
  });
  if (findSport) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Trainer with this Sport appointment already exists',
    );
  }
  const result = await OneAppointmentSchedule.create(payload);
  return result;
};

const updateAppointmentIntoDB = async (
  id: string,
  payload: Partial<IOneAppointmentSchedule>,
) => {
  const result = await OneAppointmentSchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllAppointmentsFromDB = async (query: Record<string, unknown>) => {
  const appointmentQuery = new QueryBuilder(
    OneAppointmentSchedule.find().populate([
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
  const result = await OneAppointmentSchedule.findById(id);
  return result;
};

const getAppointmentByIdFromDB = async (id: string) => {
  const result = await OneAppointmentSchedule.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Could not find the appointment',
    );
  }
  return result;
};

const deleteAppointmentFromDB = async (id: string) => {
  const result = await OneAppointmentSchedule.findByIdAndDelete(id);
  return result;
};

export const OneAppointmentScheduleServices = {
  createAppointmentIntoDB,
  updateAppointmentIntoDB,
  getAllAppointmentsFromDB,
  getSingleAppointmentFromDB,
  deleteAppointmentFromDB,
  getAppointmentByIdFromDB,
};
