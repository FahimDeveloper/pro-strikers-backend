import QueryBuilder from '../../builder/QueryBuilder';
import { generateUniqueStudentId } from '../../utils/randomAcmId';
import { IAcademyStudent } from './academyStudent.interfaces';
import { AcademyStudentModel } from './academyStudent.modal';

const createAcademyStudentInDB = async (payoload: IAcademyStudent) => {
  const randomID = await generateUniqueStudentId();
  const result = await AcademyStudentModel.create({
    ...payoload,
    student_id: String(randomID),
  });
  return result;
};

const updateAcademyStudentInfoInDB = async (
  id: string,
  payload: Partial<IAcademyStudent>,
) => {
  const result = await AcademyStudentModel.findByIdAndUpdate(id, payload);
  return result;
};

const getAcademyStudentByAcademyId = async (
  academyId: string,
  query: Record<string, unknown>,
) => {
  const academyStudentQuery = new QueryBuilder(
    AcademyStudentModel.find({ academy: academyId }),
    query,
  )
    .search(['name', 'email', 'phone'])
    .filter()
    .paginate();
  const result = await academyStudentQuery?.modelQuery;
  const count = await academyStudentQuery?.countTotal();
  return { result, count };
};

const getAcademySingleStudentById = async (id: string) => {
  const result = await AcademyStudentModel.findById(id);
  return result;
};

export const AcademyStudentServices = {
  createAcademyStudentInDB,
  updateAcademyStudentInfoInDB,
  getAcademyStudentByAcademyId,
  getAcademySingleStudentById,
};
