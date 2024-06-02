import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    // secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, httpStatus.OK, 'logged in successfully!', accessToken);
});

const loginAdmin = catchAsync(async (req, res) => {
  const result = await AuthServices.loginAdminIntoDB(req.body);

  const { accessToken, refreshToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    // secure: config.NODE_ENV === 'production',
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, httpStatus.OK, 'logged in successfully!', {
    user,
    accessToken,
  });
});

// const changePassword = catchAsync(async (req, res) => {
//   const { ...passwordData } = req.body;

//   const result = await AuthServices.changePassword(req.user, passwordData);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password is updated successfully!',
//     data: result,
//   });
// });

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The request not authorized!');
  }
  const { user, accessToken } = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, httpStatus.OK, 'Access token is retrieved successfully!', {
    user,
    accessToken,
  });
});

// const forgetPassword = catchAsync(async (req, res) => {
//   const userId = req.body.id;
//   const result = await AuthServices.forgetPassword(userId);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Reset link is generated successfully!',
//     data: result,
//   });
// });

// const resetPassword = catchAsync(async (req, res) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
//   }

//   const result = await AuthServices.resetPassword(req.body, token);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password reset successfully!',
//     data: result,
//   });
// });

export const AuthControllers = {
  loginUser,
  loginAdmin,
  refreshToken,
  // changePassword,
  // forgetPassword,
  // resetPassword,
};
