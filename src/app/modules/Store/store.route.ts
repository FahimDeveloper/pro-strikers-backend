import express, { NextFunction, Request, Response } from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { StoreControllers } from './store.controller';
import { StoreValidations } from './store.validation';
import { upload } from '../../middlewares/multer.middleware';

const route = express.Router();

route.get(
  '/products',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  StoreControllers.getAllProducts,
);

route.get(
  '/products/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  StoreControllers.getSingleProduct,
);

route.post(
  '/products/create',
  upload.array('image'),
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(StoreValidations.createValidation),
  StoreControllers.createProduct,
);

route.patch(
  '/products/update/:id',
  upload.array('image'),
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(StoreValidations.updateValidation),
  StoreControllers.updateProduct,
);

route.delete(
  '/products/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  StoreControllers.deleteProduct,
);

export const StoreRoutes = route;
