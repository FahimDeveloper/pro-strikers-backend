import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';
import { Admin } from '../modules/Admin/admin.model';
import { IRole } from '../utils/role';

const authMiddleware = (...requiredRoles: Partial<IRole[]>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'The request not authorized!',
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;
    let user;
    if (role === 'user') {
      user = await User.isUserExistsByEmail(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
      }
    } else if (role === 'admin' || role === 'superAdmin') {
      user = await Admin.isAdminExists(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
      }
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user not authorized!');
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default authMiddleware;
