import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { ILogin, IRegister } from './Authentication.interface';
import { createToken, verifyToken } from '../../utils/auth';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ROLE } from '../../utils/role';
import { Admin } from '../Admin/admin.model';
import { ResetPassService } from '../ResetPass/resetPass.services';
import { sendEmail } from '../../utils/sendEmail';

const loginUserIntoDB = async (payload: ILogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!');
  }

  const passwordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password incorrect!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  let accessToken;
  let refreshToken;
  if (payload?.remember) {
    accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_remember_access_expires_in as string,
    );
    refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_remember_refresh_expires_in as string,
    );
  } else {
    accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
    refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );
  }

  const { _id, first_name, last_name, image, email, role } = user;

  return {
    user: { _id, first_name, last_name, image, email, role },
    accessToken,
    refreshToken,
  };
};

const registerUserIntoDB = async (payload: IRegister) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Already exists');
  }
  const result = await User.create(payload);

  const jwtPayload = {
    email: payload.email,
    role: 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const { _id, first_name, last_name, image, email, role } = result;

  return {
    user: { _id, first_name, last_name, image, email, role },
    accessToken,
    refreshToken,
  };
};

const loginAdminIntoDB = async (payload: ILogin) => {
  const user = await Admin.isAdminExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!');
  }

  const passwordMatch = await Admin.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password incorrect!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  let accessToken;
  let refreshToken;
  if (payload?.remember) {
    accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_remember_access_expires_in as string,
    );
    refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_remember_refresh_expires_in as string,
    );
  } else {
    accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
    refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );
  }

  const { _id, first_name, last_name, image, email, role } = user;

  return {
    user: { _id, first_name, last_name, image, email, role },
    accessToken,
    refreshToken,
  };
};

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userData.userId);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   // checking if the user is already deleted

//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }

//   // checking if the user is blocked

//   const userStatus = user?.status;

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//   }

//   //checking if the password is correct

//   if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );

//   await User.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   );

//   return null;
// };

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  let user;
  let jwtPayload;
  if (
    decoded.role === ROLE.admin ||
    decoded.role === ROLE.superAdmin ||
    decoded.role === ROLE.trainer
  ) {
    user = await Admin.isAdminExists(decoded.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    jwtPayload = {
      email: user?.email,
      role: user?.role,
    };
  } else if (decoded.role === ROLE.user) {
    user = await User.isUserExistsByEmail(decoded.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    jwtPayload = {
      email: user?.email,
      role: user?.role,
    };
  }

  const accessToken = createToken(
    jwtPayload!,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const { _id, first_name, last_name, image, email, role } = user!;
  return {
    user: { _id, first_name, last_name, image, email, role },
    accessToken,
  };
};

const verifyLink = async (payload: string) => {
  jwt.verify(payload, config.jwt_access_secret as string) as JwtPayload;
  return;
};

const verifyCode = async ({ token, otp }: { token: string; otp: number }) => {
  const { email } = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const result = await ResetPassService.verifyResetCode({ email, code: otp });
  if (!result) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'code not valid');
  }
  return result;
};

const forgetPasswordForAdmin = async (email: string) => {
  const user = await Admin.isAdminExists(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '15m',
  );
  const ui_link =
    process.env.NODE_ENV === 'production'
      ? config.admin_reset_pass_live_ui_link
      : config.admin_reset_pass_test_ui_link;
  const link = `${ui_link}/${user._id}/${resetToken}`;
  await sendEmail({ email, link });
  return;
};

const forgetPasswordForUser = async (email: string) => {
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '15m',
  );
  const ui_link =
    process.env.NODE_ENV === 'production'
      ? config.user_reset_pass_live_ui_link
      : config.user_reset_pass_test_ui_link;
  const link = `/reset-password/${ui_link}/${user._id}/${resetToken}`;
  await sendEmail({ email, link });
  return;
};

const resetCodeSend = async (token: string) => {
  const { email } = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const code = Math.floor(Math.random() * 9000) + 1000;
  await ResetPassService.createResetCode({
    email: email,
    code,
  });
  await sendEmail({ email, code });
  return;
};

const resetAdminPasswordIntoDB = async (payload: {
  id: string;
  password: string;
  token: string;
}) => {
  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const newHashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  await Admin.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
    },
  );
  return;
};

const resetUserPasswordIntoDB = async (payload: {
  id: string;
  password: string;
  token: string;
}) => {
  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const newHashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
    },
  );
  return;
};

export const AuthenticationServices = {
  loginUserIntoDB,
  registerUserIntoDB,
  loginAdminIntoDB,
  refreshToken,
  resetCodeSend,
  verifyLink,
  verifyCode,
  resetAdminPasswordIntoDB,
  forgetPasswordForAdmin,
  forgetPasswordForUser,
  resetUserPasswordIntoDB,
  // resetPassword,
};