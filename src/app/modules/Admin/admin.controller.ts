import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.services';

const createAdminUser = catchAsync(async (req, res) => {
  await AdminServices.createAdminUserIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Admin user created succesfully');
});

const updateAdminUser = catchAsync(async (req, res) => {
  await AdminServices.updateAdminUserIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Admin user updated succesfully');
});

const getAllAdminUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminUsersFromDB();
  sendResponse(res, httpStatus.OK, 'Admins are retrieved succesfully', result);
});

const getAllTrainers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllTrainersFromDB();
  sendResponse(
    res,
    httpStatus.OK,
    'Trainers are retrieved succesfully',
    result,
  );
});

const getSingleAdminUser = catchAsync(async (req, res) => {
  const result = await AdminServices.getSingleAdminUserFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Admin is retrieved succesfully', result);
});

const deleteAdminUser = catchAsync(async (req, res) => {
  await AdminServices.deleteAdminUserFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Admin is deleted succesfully');
});

export const AdminControllers = {
  createAdminUser,
  updateAdminUser,
  getAllTrainers,
  getAllAdminUsers,
  getSingleAdminUser,
  deleteAdminUser,
};
