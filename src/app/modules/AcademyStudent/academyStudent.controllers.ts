import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademyStudentServices } from './academyStudent.services';

const createAcademyStudent = catchAsync(async (req, res) => {
  const result = await AcademyStudentServices.createAcademyStudentInDB(
    req.body,
  );
  sendResponse(
    res,
    httpStatus.CREATED,
    'Academy Student created successfully',
    result,
  );
});

const updateAcademyStudentInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademyStudentServices.updateAcademyStudentInfoInDB(
    id,
    req.body,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Academy Student updated successfully',
    result,
  );
});

const getAcademyStudentsByAcademyId = catchAsync(async (req, res) => {
  const { academyId } = req.params;
  const { result, count } =
    await AcademyStudentServices.getAcademyStudentByAcademyId(
      academyId,
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Academy Students retrieved successfully',
    result,
    count,
  );
});

const getAcademySingleStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademyStudentServices.getAcademySingleStudentById(id);
  sendResponse(
    res,
    httpStatus.OK,
    'Academy Student retrieved successfully',
    result,
  );
});

export const AcademyStudentController = {
  createAcademyStudent,
  updateAcademyStudentInfo,
  getAcademyStudentsByAcademyId,
  getAcademySingleStudentById,
};
