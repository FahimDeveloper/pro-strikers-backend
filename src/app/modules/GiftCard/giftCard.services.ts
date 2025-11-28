import mongoose from 'mongoose';
import GiftCardPayment from '../giftCartPayment/giftCartPayment.model';
import { GiftCard } from './giftCard.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IGiftCard } from './giftCard.interface';
import {
  sendFacilityGiftCardToBuyer,
  sendFacilityGiftCardToRecipient,
  sendShopifyGiftCardToBuyer,
  sendShopifyGiftCardToRecipient,
} from '../../utils/email';

const purchaseGiftCard = async (payload: {
  gift_info: IGiftCard;
  payment_info: any;
}) => {
  const session = await mongoose.startSession();
  const { gift_info, payment_info } = payload;
  try {
    session.startTransaction();
    const payment = await GiftCardPayment.create([payment_info], { session });
    const createPayload = {
      ...gift_info,
      payment: payment[0]._id,
    };
    await GiftCard.create([createPayload], { session });
    await session.commitTransaction();
    session.endSession();
    if (gift_info?.use_for === 'shop') {
      if (gift_info?.gift_by === gift_info?.gift_for) {
        sendShopifyGiftCardToBuyer({
          email: gift_info.gift_for,
          giftCode: gift_info.code,
          amount: gift_info.amount,
        });
      } else {
        sendShopifyGiftCardToRecipient({
          email: gift_info.gift_for,
          giftCode: gift_info.code,
          amount: gift_info.amount,
          sender: gift_info.sender_name!,
        });
      }
    } else if (gift_info?.use_for === 'facility') {
      if (gift_info?.gift_by === gift_info?.gift_for) {
        sendFacilityGiftCardToBuyer({
          email: gift_info.gift_for,
          giftCode: gift_info.code,
          amount: gift_info.amount,
        });
      } else {
        sendFacilityGiftCardToRecipient({
          email: gift_info.gift_for,
          giftCode: gift_info.code,
          amount: gift_info.amount,
          sender: gift_info.sender_name!,
        });
      }
    }
    return;
  } catch (error: any) {
    console.log(error?.message);
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to purchase gift card');
  }
};

export const GiftCardService = {
  purchaseGiftCard,
};
