import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { CategoryControllers } from './category.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validations';
import { upload } from '../../middlewares/multer.middleware';

const route = express.Router();

route.get('/', CategoryControllers.getAllCategories);

route.post(
  '/create',
  upload.single('image'),
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(CategoryValidations.createValidation),
  CategoryControllers.createCategory,
);

route.patch(
  '/update/:id',
  upload.single('image'),
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(CategoryValidations.updateValidation),
  CategoryControllers.updateCategory,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  CategoryControllers.deleteCategory,
);

export const CategoryRoutes = route;
