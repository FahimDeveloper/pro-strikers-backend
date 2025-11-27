import express from 'express';
import { GiftCardControllers } from './giftCard.contollers';

const router = express.Router();

router.post('/purchase', GiftCardControllers.purchaseGiftCard);

export const GiftCardRoutes = router;
