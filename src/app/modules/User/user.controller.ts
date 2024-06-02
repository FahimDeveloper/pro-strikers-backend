import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';

const createUser = catchAsync(async (req, res) => {
  const file = req.file;
  await UserServices.createUserIntoDB(req.body, file);
  sendResponse(res, httpStatus.CREATED, 'User is created succesfully');
});

const updateUser = catchAsync(async (req, res) => {
  const file = req.file;
  await UserServices.updateUserIntoDB(req.params.id, req.body, file);
  sendResponse(res, httpStatus.OK, 'User is updated succesfully');
});

const getAllUsers = catchAsync(async (req, res) => {
  const { result, count } = await UserServices.getAllUsersFromDB(req.query);
  sendResponse(
    res,
    httpStatus.OK,
    'Users are retrieved succesfully',
    result,
    count,
  );
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserServices.getSingleUserFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'User is retrieved succesfully', result);
});

const getMembershipUsers = catchAsync(async (req, res) => {
  const { result, count } = await UserServices.getMembershipUsersFromDB(
    req.query,
  );
  sendResponse(
    res,
    httpStatus.OK,
    'Users are retrieved succesfully',
    result,
    count,
  );
});

const deleteUser = catchAsync(async (req, res) => {
  await UserServices.deleteUserFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'User is deleted succesfully');
});

export const UserControllers = {
  createUser,
  getMembershipUsers,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
