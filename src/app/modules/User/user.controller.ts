import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createNormalUser = catchAsync(async (req, res) => {
  const { password, email } = req.body;
  const result = await UserServices.createNormalUserIntoDB(password, email);

  sendResponse(res, httpStatus.OK, 'Student is created succesfully', result);
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, email } = req.body;
  const result = await UserServices.createAdminIntoDB(password, email);

  sendResponse(res, httpStatus.OK, 'Admin is created succesfully', result);
});

export const UserControllers = {
  createNormalUser,
  createAdmin,
};
