import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import validateRequest from '../../middlewares/validateRequest';
import { TournamentPaymentValidations } from './tournamentPayment.validations';
import { TournamentPaymentControllers } from './tournamentPayment.controllers';

const route = express.Router();

route.get(
  '/',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  TournamentPaymentControllers.getTournamentPaymentList,
);

route.get(
  '/:email',
  //authMiddleware(ROLE.user),
  TournamentPaymentControllers.getUserTournamentPaymentList,
);

route.post(
  '/create',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(TournamentPaymentValidations.createValidation),
  TournamentPaymentControllers.createTournamentPayment,
);

route.patch(
  '/update/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  validateRequest(TournamentPaymentValidations.updateValidation),
  TournamentPaymentControllers.updateTournamentPayment,
);

route.delete(
  '/delete/:id',
  //authMiddleware(ROLE.superAdmin, ROLE.admin),
  TournamentPaymentControllers.deleteTournamentPayment,
);

export const TournamentPaymentRoutes = route;
