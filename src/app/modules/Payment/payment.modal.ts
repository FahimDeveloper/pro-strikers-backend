import { model, Schema } from 'mongoose';
import { IPayment } from './payment.interface';

const PaymentSchema = new Schema<IPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Payment = model<IPayment>('Payment', PaymentSchema);

export default Payment;
