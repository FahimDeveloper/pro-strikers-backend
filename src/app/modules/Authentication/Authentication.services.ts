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
import { generateRandomPassword } from '../../utils/generateRandomPassword';

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

  const { _id, first_name, last_name, image, email, phone, verified, role } =
    user;

  return {
    user: { _id, first_name, last_name, image, email, phone, verified, role },
    accessToken,
    refreshToken,
  };
};

const continueWithSocialIntoDB = async (payload: any) => {
  const user = await User.findOne({
    email: payload.email,
  });

  const randomPass = generateRandomPassword();

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

  if (!user) {
    const result = await User.create({
      ...payload,
      password: randomPass,
      verified: true,
    });
    if (result) {
      await sendEmail({
        email: payload.email,
        password: randomPass,
        provider: payload.provider,
      });
    }
    const { _id, first_name, last_name, image, email, phone, verified, role } =
      result;
    return {
      user: { _id, first_name, last_name, image, email, phone, verified, role },
      accessToken,
      refreshToken,
    };
  } else {
    if (user.provider !== payload.provider) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You are trying to access with wrong provider, your account has different provider',
      );
    } else {
      const {
        _id,
        first_name,
        last_name,
        image,
        email,
        phone,
        verified,
        role,
      } = user;
      return {
        user: {
          _id,
          first_name,
          last_name,
          image,
          email,
          phone,
          verified,
          role,
        },
        accessToken,
        refreshToken,
      };
    }
  }
};

const registerUserIntoDB = async (payload: IRegister) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Already exists');
  }
  const result = await User.create({
    ...payload,
    provider: 'email with password',
  });

  const jwtPayload = {
    email: payload.email,
    role: 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const emailAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_remember_access_expires_in as string,
  );

  const emailVerifyLink = `${config.web_app_test_ui_link}/verify-email/${emailAccessToken}`;
  await sendEmail({ email: payload.email, emailVerifyLink });

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const { _id, first_name, last_name, image, email, phone, verified, role } =
    result;

  return {
    user: { _id, first_name, last_name, image, email, phone, verified, role },
    accessToken,
    refreshToken,
  };
};

const emailVerifyIntoDB = async (token: string) => {
  const decodedToken = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const user = await User.findOne({ email: decodedToken.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!');
  }
  if (user?.verified) {
    const { _id, first_name, last_name, image, email, phone, verified, role } =
      user;
    return {
      _id,
      first_name,
      last_name,
      image,
      email,
      phone,
      verified,
      role,
    };
  } else {
    const result = await User.findByIdAndUpdate(
      user.id,
      { verified: true },
      { new: true, runValidators: true },
    );
    if (result) {
      const {
        _id,
        first_name,
        last_name,
        image,
        email,
        phone,
        verified,
        role,
      } = result;
      return {
        _id,
        first_name,
        last_name,
        image,
        email,
        verified,
        phone,
        role,
      };
    }
  }
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

  const { _id, first_name, last_name, image, email, phone, role } = user;

  return {
    user: { _id, first_name, last_name, image, email, phone, role },
    accessToken,
    refreshToken,
  };
};

const changeUserPasswordIntoDB = async (id: string, payload: any) => {
  const user = await User.findById(id).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //checking if the password is correct
  const passwordMatch = await User.isPasswordMatched(
    payload.current_password,
    user?.password,
  );
  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Current password is incorrect');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.new_password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findByIdAndUpdate(id, {
    password: newHashedPassword,
  });
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Password change failed',
    );
  }
  return;
};

const changeAdminPasswordIntoDB = async (id: string, payload: any) => {
  const user = await Admin.findById(id).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //checking if the password is correct
  const passwordMatch = await Admin.isPasswordMatched(
    payload.current_password,
    user?.password,
  );
  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Current password is incorrect');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.new_password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await Admin.findByIdAndUpdate(id, {
    password: newHashedPassword,
  });
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Password change failed',
    );
  }
  return;
};

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
    throw new AppError(httpStatus.BAD_REQUEST, 'code invalid');
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
    config.node_env === 'production'
      ? config.web_app_live_ui_link
      : config.web_app_test_ui_link;
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
    config.node_env === 'production'
      ? config.website_live_ui_link
      : config.website_test_ui_link;
  const link = `${ui_link}/${user._id}/${resetToken}`;
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
  emailVerifyIntoDB,
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
  continueWithSocialIntoDB,
  changeUserPasswordIntoDB,
  changeAdminPasswordIntoDB,
};
