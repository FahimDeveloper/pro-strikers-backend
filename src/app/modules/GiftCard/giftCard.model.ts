import { model, Schema } from 'mongoose';
import { IGiftCard, IGiftCardRedeem } from './giftCard.interface';

const GiftCardRedeemSchema = new Schema<IGiftCardRedeem>(
  {
    redeemedAt: { type: Date },
    amount: { type: Number },
  },
  { _id: false },
);

const GiftCardSchema = new Schema<IGiftCard>(
  {
    uses: {
      type: String,
      enum: ['PRO_SHOPPING', 'PRO_FACILITY'],
      required: true,
    },
    code: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'GiftCardPayment',
      required: true,
    },
    redeemList: [GiftCardRedeemSchema],
    gift_for: { type: String, required: true },
    gift_by: { type: String, required: true },
  },
  {
    _id: true,
    versionKey: false,
    timestamps: true,
  },
);

export const GiftCard = model<IGiftCard>('GiftCard', GiftCardSchema);
