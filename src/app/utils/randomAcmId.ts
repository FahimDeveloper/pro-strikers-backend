import { AcademyModel } from '../modules/Academy/academy.modal';

export const generateUniqueStudentId = async (): Promise<string> => {
  while (true) {
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();
    const exists = await AcademyModel.findOne({ student_id: randomId }).lean();
    if (!exists) {
      return randomId;
    }
  }
};
