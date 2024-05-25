import { ICourseSchedule } from './courseSchedule.interface';
import { CourseSchedule } from './courseSchedule.model';

const createCourseIntoDB = async (payload: ICourseSchedule) => {
  const result = await CourseSchedule.create(payload);
  return result;
};

const updateCourseIntoDB = async (
  id: string,
  payload: Partial<ICourseSchedule>,
) => {
  const result = await CourseSchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await CourseSchedule.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseSchedule.findById(id);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await CourseSchedule.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
  );
  return result;
};

export const CourseScheduleServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
