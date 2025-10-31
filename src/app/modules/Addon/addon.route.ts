import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../middlewares/multer.middleware';
import { AddonControllers } from './addon.controller';
import { AddonValidations } from './addon.validations';

const route = express.Router();
route.get('/', AddonControllers.getAllAddons);

route.get('/sport-addon', AddonControllers.getSportAddons);

route.get('/:id', AddonControllers.getSingleAddon);

route.post(
  '/create',
  upload.array('image'),
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(AddonValidations.createValidation),
  AddonControllers.createAddon,
);

route.patch(
  '/update/:id',
  upload.array('image'),
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(AddonValidations.updateValidation),
  AddonControllers.updateAddon,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  AddonControllers.deleteAddon,
);

export const AddonRoutes = route;
