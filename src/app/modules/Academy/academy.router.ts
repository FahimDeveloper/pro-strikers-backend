import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademyValidation } from './academy.validations';
import { AcademyController } from './academy.controllers';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';

const router = express.Router();

router.post(
  '/create',
  //authMiddleware(ROLE.admin, ROLE.academy, ROLE.superAdmin),
  validateRequest(AcademyValidation.createValidation),
  AcademyController.createAcademy,
);

router.patch(
  '/update/:id',
  validateRequest(AcademyValidation.updateValidation),
  AcademyController.updateAcademyInfo,
);

router.get(
  '/',
  //authMiddleware(ROLE.admin, ROLE.superAdmin),
  AcademyController.getAllAcademies,
);
router.get(
  '/:id',
  //authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.academy),
  AcademyController.getAcademyById,
);
router.get(
  '/:adminId',
  //authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.academy),
  AcademyController.getAcademyByAdminId,
);

export const AcademyRoutes = router;
