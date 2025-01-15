import { model, Schema } from 'mongoose';
import { IClassPayment } from './classPayment.interface';

const ClassPaymentSchema = new Schema<IClassPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const ClassPayment = model<IClassPayment>('ClassPayment', ClassPaymentSchema);

export default ClassPayment;
