import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { BundleCreditPackageValidations } from './bundleCreditPack.validations';
import { BundleCreditPackageControllers } from './bundleCreditPack.controllers';

const router = express.Router();

router.get(
  '/',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  BundleCreditPackageControllers.getAllPurchasedBundleCreditPackages,
);

router.get(
  '/:email',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.user),
  BundleCreditPackageControllers.getUserPurchasedBundleCreditPackages,
);

router.post(
  '/create',
  authMiddleware(ROLE.user),
  validateRequest(BundleCreditPackageValidations.createValidation),
  BundleCreditPackageControllers.purchaseBundleCreditPackage,
);

router.patch(
  '/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  validateRequest(BundleCreditPackageValidations.updateValidation),
  BundleCreditPackageControllers.updateUseCreditPackage,
);

export const BundleCreditPackageRoutes = router;
