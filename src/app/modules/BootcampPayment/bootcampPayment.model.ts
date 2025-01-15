import { model, Schema } from 'mongoose';
import { IBootcampPayment } from './bootcampPayment.interface';

const BootcampPaymentSchema = new Schema<IBootcampPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const BootcampPayment = model<IBootcampPayment>(
  'BootcampPayment',
  BootcampPaymentSchema,
);

export default BootcampPayment;
