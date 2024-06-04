import express, { NextFunction, Request, Response } from 'express';
import { AdminControllers } from './admin.controller';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from './admin.validation';
import { upload } from '../../middlewares/multer.middleware';

const route = express.Router();

route.get(
  '/',
  // authMiddleware(ROLE.superAdmin, ROLE.admin),
  AdminControllers.getAllAdminUsers,
);

// route.get('/trainers', AdminControllers.getAllTrainers);

// route.post(
//   '/create',
//   upload.single('image'),
//   authMiddleware(ROLE.superAdmin, ROLE.admin),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(adminValidations.createValidation),
//   AdminControllers.createAdminUser,
// );

// route.get(
//   '/:id',
//   authMiddleware(ROLE.superAdmin, ROLE.admin),
//   AdminControllers.getSingleAdminUser,
// );

// route.patch(
//   '/update/:id',
//   upload.single('image'),
//   authMiddleware(ROLE.superAdmin, ROLE.admin),
//   (req: Request, res: Response, next: NextFunction) => {
//     if (req.body.data) {
//       req.body = JSON.parse(req.body.data);
//     }
//     next();
//   },
//   validateRequest(adminValidations.updateValidation),
//   AdminControllers.updateAdminUser,
// );

// route.delete(
//   '/delete/:id',
//   authMiddleware(ROLE.superAdmin, ROLE.admin),
//   AdminControllers.deleteAdminUser,
// );

export const AdminRoutes = route;
