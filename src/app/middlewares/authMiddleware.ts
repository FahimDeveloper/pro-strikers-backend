import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';
import { Admin } from '../modules/Admin/admin.model';
import { IRole, ROLE } from '../utils/role';
import fs from 'fs';

const authMiddleware = (...requiredRoles: Partial<IRole[]>) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const file = req.file?.path;
    if (!token) {
      if (file) {
        fs.unlinkSync(file as string);
      }
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

    if (role === ROLE.user) {
      const user = await User.isUserExistsByEmail(email);
      if (!user) {
        if (file) {
          fs.unlinkSync(file as string);
        }
        throw new AppError(httpStatus.UNAUTHORIZED, 'The user not authorized!');
      }
    } else if (role === ROLE.admin || role === ROLE.superAdmin) {
      const user = await Admin.isAdminExists(email);
      if (!user) {
        if (file) {
          fs.unlinkSync(file as string);
        }
        throw new AppError(httpStatus.UNAUTHORIZED, 'The user not authorized!');
      }
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      if (file) {
        fs.unlinkSync(file as string);
      }
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user not authorized!');
    }

    req.user = decoded;
    next();
  });

export default authMiddleware;
