import express, { NextFunction, Request, Response } from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { upload } from '../../middlewares/multer.middleware';
import { ProductValidations } from './product.validation';

const route = express.Router();

route.get(
  '/products',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ProductControllers.getAllProducts,
);

route.get(
  '/products/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ProductControllers.getSingleProduct,
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
  validateRequest(ProductValidations.createValidation),
  ProductControllers.createProduct,
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
  validateRequest(ProductValidations.updateValidation),
  ProductControllers.updateProduct,
);

route.delete(
  '/products/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = route;
