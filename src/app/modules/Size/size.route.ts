import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { SizeValidations } from './size.validations';
import { SizeControllers } from './size.controllers';

const router = express.Router();

router.get(
  '/',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  SizeControllers.getAllSizes,
);

router.post(
  '/create',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(SizeValidations.createValidation),
  SizeControllers.createSize,
);

router.patch(
  '/update/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(SizeValidations.updateValidation),
  SizeControllers.updateSize,
);

router.delete(
  '/delete/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  SizeControllers.deleteSize,
);

export const SizeRoutes = router;
