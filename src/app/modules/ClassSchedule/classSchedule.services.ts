import moment from 'moment';
import QueryBuilder from '../../builder/QueryBuilder';
import { IClassDaySchedule, IClassSchedule } from './classSchedule.interface';
import { ClassSchedule } from './classSchedule.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createClassIntoDB = async (payload: IClassSchedule) => {
  const result = await ClassSchedule.create(payload);
  return result;
};

const updateClassIntoDB = async (
  id: string,
  payload: Partial<IClassSchedule>,
) => {
  const result = await ClassSchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllClassesFromDB = async (query: Record<string, unknown>) => {
  const classQuery = new QueryBuilder(ClassSchedule.find(), query)
    .search(['class_name'])
    .filter()
    .paginate();
  const result = await classQuery?.modelQuery;
  const count = await classQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findById(id);
  return result;
};

const getClassByDateFromDB = async (payload: any) => {
  const result = await ClassSchedule.findById(payload.id).select(
    'sport schedules trainer',
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Class not found');
  }
  const day = moment(payload.date).format('dddd');
  if (result) {
    let schedule;
    schedule = result?.schedules.find(
      (schedule: IClassDaySchedule) => schedule.day === day,
    );
    if (!schedule?.active) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Class not available in your selected date',
      );
    }
    result.schedules = [schedule];
    return result;
  }
};

const deleteClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findByIdAndDelete(id);
  return result;
};

export const ClassScheduleServices = {
  createClassIntoDB,
  updateClassIntoDB,
  getAllClassesFromDB,
  getSingleClassFromDB,
  getClassByDateFromDB,
  deleteClassFromDB,
};
