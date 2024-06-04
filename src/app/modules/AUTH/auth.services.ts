import httpStatus from 'http-status';
import config from '../../config';
import { createToken, verifyToken } from '../../utils/auth';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import { ILogin } from './auth.interface';
import { Admin } from '../Admin/admin.model';
import { ROLE } from '../../utils/role';
import { sendEmail } from '../../utils/sendEmail';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResetPassService } from '../ResetPass/resetPass.services';
import bcrypt from 'bcrypt';

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

  return {
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
  if (payload?.remember) {
    accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_remember_access_expires_in as string,
    );
  } else {
    accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  }

  let refreshToken;
  if (payload?.remember) {
    refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_remember_refresh_expires_in as string,
    );
  } else {
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
  const { email, role } = jwt.verify(
    payload,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (!email && !role) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The link already expired');
  }
  return;
};

const verifyCode = async ({ token, otp }: { token: string; otp: number }) => {
  const { email, role } = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (!email && !role) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'code already expired');
  }
  const result = await ResetPassService.verifyResetCode({ email, code: otp });
  if (!result) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'code not valid');
  }
  return result;
};

const forgetPasswordForAdmin = async (email: string) => {
  const user = await Admin.isAdminExists(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
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
      ? config.reset_pass_ui_link
      : config.reset_pass_local_ui_link;
  const link = `${ui_link}/${user._id}/${resetToken}`;
  await sendEmail({ email, link });
  return;
};

const resetCodeSend = async (payload: string) => {
  const result = await Admin.findById(payload).select('email');
  const code = Math.floor(Math.random() * 9000) + 1000;
  await ResetPassService.createResetCode({
    email: result?.email as string,
    code,
  });
  await sendEmail({ email: result?.email as string, code });
  return;
};

const resetAdminPasswordIntoDB = async (payload: {
  id: string;
  password: string;
  token: string;
}) => {
  const user = await Admin.findById(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
  }

  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (user.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
  }

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

export const AuthServices = {
  loginUserIntoDB,
  loginAdminIntoDB,
  refreshToken,
  resetCodeSend,
  verifyLink,
  verifyCode,
  resetAdminPasswordIntoDB,
  forgetPasswordForAdmin,
  // resetPassword,
};
