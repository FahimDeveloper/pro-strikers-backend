import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.services';

const createAdminUser = catchAsync(async (req, res) => {
  const file = req.file;
  await AdminServices.createAdminUserIntoDB(req.body, file);
  sendResponse(res, httpStatus.CREATED, 'Admin user created succesfully');
});

const updateAdminUser = catchAsync(async (req, res) => {
  const file = req.file;
  const updateInfo = await AdminServices.updateAdminUserIntoDB(
    req.params.id,
    req.body,
    file,
  );
  let result;
  if (updateInfo) {
    const { _id, first_name, last_name, phone, email, role } = updateInfo;
    result = { _id, first_name, last_name, phone, email, role };
  }
  sendResponse(res, httpStatus.OK, 'Admin user updated succesfully', result);
});

const getAllAdminUsers = catchAsync(async (req, res) => {
  const { result, count } = await AdminServices.getAllAdminUsersFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Admins are retrieved succesfully',
    result,
    count,
  );
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
