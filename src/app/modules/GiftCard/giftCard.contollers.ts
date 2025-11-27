import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GiftCardService } from './giftCard.services';

const purchaseGiftCard = catchAsync(async (req, res) => {
  await GiftCardService.purchaseGiftCard(req.body);
  sendResponse(res, httpStatus.OK, 'Gift card purchased successfully');
});

export const GiftCardControllers = {
  purchaseGiftCard,
};
