import { model, Schema } from 'mongoose';
import { IGiftPayment } from './giftCartPayment.interface';

const giftCardPaymentSchema = new Schema<IGiftPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const GiftCardPayment = model<IGiftPayment>(
  'giftCardPayment',
  giftCardPaymentSchema,
);

export default GiftCardPayment;
