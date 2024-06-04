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

const adminForgetPassword = catchAsync(async (req, res) => {
  await AuthServices.forgetPasswordForAdmin(req.body.email);
  sendResponse(
    res,
    httpStatus.OK,
    'Check your email and reset your password within 15 minutes',
  );
});

const sendResetCode = catchAsync(async (req, res) => {
  console.log(req.body);
  await AuthServices.resetCodeSend(req.body.id);
  sendResponse(
    res,
    httpStatus.OK,
    'We already send your reset code in your email',
  );
});

const verifyUiLink = catchAsync(async (req, res) => {
  const { token } = req.params;
  await AuthServices.verifyLink(token);
  sendResponse(res, httpStatus.OK, 'Success');
});

const verifyResetCode = catchAsync(async (req, res) => {
  await AuthServices.verifyCode(req.body);
  sendResponse(res, httpStatus.OK, 'Success');
});

const resetAdminPassword = catchAsync(async (req, res) => {
  const token = req.body.token;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  await AuthServices.resetAdminPasswordIntoDB(req.body);
  sendResponse(res, httpStatus.OK, 'Password reset successfully!');
});

export const AuthControllers = {
  loginUser,
  loginAdmin,
  refreshToken,
  adminForgetPassword,
  sendResetCode,
  verifyUiLink,
  verifyResetCode,
  resetAdminPassword,
  // changePassword,
  // forgetPassword,
};
