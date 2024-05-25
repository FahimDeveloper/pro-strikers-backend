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

const getAllClassesFromDB = async () => {
  const result = await ClassSchedule.find();
  return result;
};

const getSingleClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findById(id);
  return result;
};

const deleteClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  return result;
};

export const ClassScheduleServices = {
  createClassIntoDB,
  updateClassIntoDB,
  getAllClassesFromDB,
  getSingleClassFromDB,
  deleteClassFromDB,
};
