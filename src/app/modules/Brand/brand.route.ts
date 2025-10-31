import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { BrandValidations } from './brand.validation';
import { BrandControllers } from './brand.controller';
import { upload } from '../../middlewares/multer.middleware';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  BrandControllers.getAllBrands,
);

route.get(
  '/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  BrandControllers.getSingleBrand,
);

route.get(
  '/category/:category',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  BrandControllers.getBrandsByCategory,
);

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
  validateRequest(BrandValidations.createValidation),
  BrandControllers.createBrand,
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
  validateRequest(BrandValidations.updateValidation),
  BrandControllers.updateBrand,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  BrandControllers.deleteBrand,
);

export const BrandRoutes = route;
