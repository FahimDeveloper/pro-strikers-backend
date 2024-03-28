import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NormalUserServices } from './normalUser.service';

const getAllNormalUsers = catchAsync(async (req, res) => {
  const result = await NormalUserServices.getAllNormalUsersFromDB();

  sendResponse(res, httpStatus.OK, 'Users are retrieved succesfully', result);
});

const getSingleNormalUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await NormalUserServices.getSingleNormalUserFromDB(email);

  sendResponse(
    res,
    httpStatus.OK,
    'Single User is retrieved succesfully',
    result,
  );
});

export const NormalUserControllers = {
  getAllNormalUsers,
  getSingleNormalUser,
};
