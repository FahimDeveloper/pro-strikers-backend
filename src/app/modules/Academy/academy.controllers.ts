import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademyService } from './academy.services';

const createAcademy = catchAsync(async (req, res) => {
  const result = await AcademyService.createAcademyInDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Academy created successfully', result);
});

const updateAcademyInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademyService.updateAcademyInfoInDB(id, req.body);
  sendResponse(res, httpStatus.OK, 'Academy updated successfully', result);
});

const getAllAcademies = catchAsync(async (req, res) => {
  const { result, count } = await AcademyService.getAllAcademiesFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Academies retrieved successfully',
    result,
    count,
  );
});

const getAcademyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademyService.getAcademyByIdFromDB(id);
  sendResponse(res, httpStatus.OK, 'Academy retrieved successfully', result);
});

const getAcademyByAdminId = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AcademyService.getAcademyByAdminIdFromDB(adminId);
  sendResponse(res, httpStatus.OK, 'Academy retrieved successfully', result);
});

export const AcademyController = {
  createAcademy,
  updateAcademyInfo,
  getAllAcademies,
  getAcademyById,
  getAcademyByAdminId,
};
