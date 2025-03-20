import express from 'express';
import { TempLinkControllers } from './tempLink.controllers';

const router = express.Router();

router.get('/verify/:id', TempLinkControllers.getTempLink);

router.post('/create', TempLinkControllers.createTempLink);

export const TempLinkRoutes = router;
