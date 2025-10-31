import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { ColorControllers } from './color.controllers';
import { ColorValidations } from './color.validations';

const router = express.Router();

router.get(
  '/',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  ColorControllers.getAllColors,
);

router.post(
  '/create',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(ColorValidations.createValidation),
  ColorControllers.createColor,
);

router.patch(
  '/update/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(ColorValidations.updateValidation),
  ColorControllers.updateColor,
);

router.delete(
  '/delete/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  ColorControllers.deleteColor,
);

export const ColorRoutes = router;
