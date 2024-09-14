import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthenticationServices } from './Authentication.services';
import AppError from '../../errors/AppError';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthenticationServices.loginUserIntoDB(req.body);

  const { accessToken, refreshToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, httpStatus.OK, 'logged in successfully!', {
    user,
    accessToken,
  });
});

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthenticationServices.registerUserIntoDB(req.body);

  const { accessToken, refreshToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, httpStatus.OK, 'Registration successfull', {
    user,
    accessToken,
  });
});

const loginAdmin = catchAsync(async (req, res) => {
  const result = await AuthenticationServices.loginAdminIntoDB(req.body);

  const { accessToken, refreshToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, httpStatus.OK, 'logged in successfully!', {
    user,
    accessToken,
  });
});

const changePassword = catchAsync(async (req, res) => {
  await AuthenticationServices.changePasswordIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Password changed successfully!');
});

const continueWithSocial = catchAsync(async (req, res) => {
  const result = await AuthenticationServices.continueWithSocialIntoDB(
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Logged in successfully!', result);
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The request not authorized!');
  }
  const { user, accessToken } =
    await AuthenticationServices.refreshToken(refreshToken);
  sendResponse(res, httpStatus.OK, 'Access token is retrieved successfully!', {
    user,
    accessToken,
  });
});

const adminForgetPassword = catchAsync(async (req, res) => {
  await AuthenticationServices.forgetPasswordForAdmin(req.body.email);
  sendResponse(
    res,
    httpStatus.OK,
    'Check your email and reset your password within 15 minutes',
  );
});

const userForgetPassword = catchAsync(async (req, res) => {
  await AuthenticationServices.forgetPasswordForUser(req.body.email);
  sendResponse(
    res,
    httpStatus.OK,
    'Check your email and reset your password within 15 minutes',
  );
});

const sendResetCode = catchAsync(async (req, res) => {
  await AuthenticationServices.resetCodeSend(req.body.token);
  sendResponse(
    res,
    httpStatus.OK,
    'We already send your reset code in your email',
  );
});

const verifyUiLink = catchAsync(async (req, res) => {
  await AuthenticationServices.verifyLink(req.params.token);
  sendResponse(res, httpStatus.OK, 'Success');
});

const verifyResetCode = catchAsync(async (req, res) => {
  await AuthenticationServices.verifyCode(req.body);
  sendResponse(res, httpStatus.OK, 'Success');
});

const resetAdminPassword = catchAsync(async (req, res) => {
  const token = req.body.token;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  await AuthenticationServices.resetAdminPasswordIntoDB(req.body);
  sendResponse(res, httpStatus.OK, 'Password reset successfully!');
});

const resetUserPassword = catchAsync(async (req, res) => {
  const token = req.body.token;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  await AuthenticationServices.resetUserPasswordIntoDB(req.body);
  sendResponse(res, httpStatus.OK, 'Password reset successfully!');
});

export const AuthenticationControllers = {
  loginUser,
  registerUser,
  loginAdmin,
  refreshToken,
  adminForgetPassword,
  sendResetCode,
  verifyUiLink,
  verifyResetCode,
  resetAdminPassword,
  resetUserPassword,
  userForgetPassword,
  continueWithSocial,
  changePassword,
};
