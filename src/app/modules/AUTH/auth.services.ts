import httpStatus from 'http-status';
import config from '../../config';
import { createToken, verifyToken } from '../../utils/auth';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import { ILogin } from './auth.interface';
import { Admin } from '../Admin/admin.model';
import { ROLE } from '../../utils/role';

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

// catchAsync(async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     throw new AppError(
//       httpStatus.UNAUTHORIZED,
//       'The request not authorized!',
//     );
//   }

//   const decoded = jwt.verify(
//     token.split(' ')[1],
//     config.jwt_access_secret as string,
//   ) as JwtPayload;

//   const { role, email } = decoded;

//   if (role === 'user') {
//     const user = await User.isUserExistsByEmail(email);
//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
//     }
//   } else if (role === 'admin' || role === 'superAdmin') {
//     const user = await Admin.isAdminExists(email);
//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
//     }
//   }

//   if (requiredRoles && !requiredRoles.includes(role)) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'The user not authorized!');
//   }

// const forgetPassword = async (userId: string) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userId);

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

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   };

//   const resetToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     '10m',
//   );

//   const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;

//   sendEmail(user.email, resetUILink);

//   console.log(resetUILink);
// };

// const resetPassword = async (
//   payload: { id: string; newPassword: string },
//   token: string,
// ) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(payload?.id);

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

//   const decoded = jwt.verify(
//     token,
//     config.jwt_access_secret as string,
//   ) as JwtPayload;

//   //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

//   if (payload.id !== decoded.userId) {
//     console.log(payload.id, decoded.userId);
//     throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
//   }

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );

//   await User.findOneAndUpdate(
//     {
//       id: decoded.userId,
//       role: decoded.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   );
// };

export const AuthServices = {
  loginUserIntoDB,
  loginAdminIntoDB,
  refreshToken,
  // changePassword,
  // forgetPassword,
  // resetPassword,
};
