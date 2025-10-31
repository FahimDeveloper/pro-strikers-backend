/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { upload } from '../../middlewares/multer.middleware';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  UserControllers.getAllUsers,
);
route.get(
  '/membership',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  UserControllers.getMembershipUsers,
);
route.get(
  '/email',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  UserControllers.getUsresEmail,
);

route.get(
  '/:id',
  //authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  UserControllers.getSingleUser,
);

// route.post(
//   '/create-membership/:id',
//   authMiddleware(ROLE.user),
//   UserControllers.createMembershipByUser,
// );

route.post(
  '/create',
  upload.single('image'),
  //authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(UserValidations.createValidation),
  UserControllers.createUser,
);
route.patch(
  '/update/:id',
  upload.single('image'),
  //authMiddleware(ROLE.user, ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(UserValidations.updateValidation),
  UserControllers.updateUser,
);
route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  UserControllers.deleteUser,
);

export const UserRoutes = route;
