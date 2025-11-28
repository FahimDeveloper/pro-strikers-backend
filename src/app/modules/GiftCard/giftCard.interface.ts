import mongoose from 'mongoose';

export interface IGiftCard {
  use_for: 'shop' | 'facility';
  code: string;
  amount: number;
  payment: mongoose.Types.ObjectId;
  redeemList: Array<IGiftCardRedeem>;
  gift_for: string;
  sender_name?: string;
  gift_by: string;
}

export interface IGiftCardRedeem {
  redeemedAt: Date;
  amount: number;
}
