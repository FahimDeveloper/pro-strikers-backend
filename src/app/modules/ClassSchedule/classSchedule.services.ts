import QueryBuilder from '../../builder/QueryBuilder';
import { IClassSchedule } from './classSchedule.interface';
import { ClassSchedule } from './classSchedule.model';

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

const deleteClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findByIdAndDelete(id);
  return result;
};

export const ClassScheduleServices = {
  createClassIntoDB,
  updateClassIntoDB,
  getAllClassesFromDB,
  getSingleClassFromDB,
  deleteClassFromDB,
};
