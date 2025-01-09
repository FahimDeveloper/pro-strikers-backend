import express, { NextFunction, Request, Response } from 'express';
import { ROLE } from '../../utils/role';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { upload } from '../../middlewares/multer.middleware';
import { ProductValidations } from './product.validation';

const route = express.Router();

route.get(
  '/',
  authMiddleware(ROLE.superAdmin, ROLE.admin, ROLE.user),
  ProductControllers.getAllProducts,
);

route.get('/web', ProductControllers.getProducts);

route.get('/:id', ProductControllers.getSingleProduct);

route.post(
  '/create',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidations.createValidation),
  ProductControllers.createProduct,
);

route.patch(
  '/update/:id',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
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
  '/delete/:id',
  authMiddleware(ROLE.superAdmin, ROLE.admin),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = route;
