import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';
import { Admin } from '../modules/Admin/admin.model';
import { IRole } from '../utils/role';

const authMiddleware = (...requiredRoles: Partial<IRole[]>) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'The request not authorized!',
      );
    }

    const decoded = jwt.verify(
      token.split(' ')[1],
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    if (role === 'user') {
      const user = await User.isUserExistsByEmail(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
      }
    } else if (role === 'admin' || role === 'superAdmin') {
      const user = await Admin.isAdminExists(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
      }
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user not authorized!');
    }

    req.user = decoded;
    next();
  });

export default authMiddleware;
