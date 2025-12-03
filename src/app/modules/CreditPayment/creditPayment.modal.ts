import { model, Schema } from 'mongoose';
import { ICreditPayment } from './creditPayment.interface';

const CreditPaymentSchema = new Schema<ICreditPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const CreditPayment = model<ICreditPayment>(
  'CreditPayment',
  CreditPaymentSchema,
);

export default CreditPayment;
