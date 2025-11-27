import mongoose from 'mongoose';

export interface IGiftCard {
  uses: 'PRO_SHOPPING' | 'PRO_FACILITY';
  code: string;
  amount: number;
  payment: mongoose.Types.ObjectId;
  redeemList: Array<IGiftCardRedeem>;
  gift_for: string;
  gift_by: string;
}

export interface IGiftCardRedeem {
  redeemedAt: Date;
  amount: number;
}
