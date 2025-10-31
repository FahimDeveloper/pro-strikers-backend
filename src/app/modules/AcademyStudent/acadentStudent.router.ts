import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { AcademyStudentValidation } from './academyStudent.validations';
import { AcademyStudentController } from './academyStudent.controllers';

const router = express.Router();

router.post(
  '/create',
 //authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.academy),
  validateRequest(AcademyStudentValidation.createValidation),
  AcademyStudentController.createAcademyStudent,
);

router.patch(
  '/:id',
 //authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.academy),
  validateRequest(AcademyStudentValidation.updateValidation),
  AcademyStudentController.updateAcademyStudentInfo,
);

router.get(
  '/:academyId',
 //authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.academy),
  AcademyStudentController.getAcademyStudentsByAcademyId,
);

router.get(
  '/:id',
 //authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.academy),
  AcademyStudentController.getAcademySingleStudentById,
);

export const AcademyStudentRoutes = router;
