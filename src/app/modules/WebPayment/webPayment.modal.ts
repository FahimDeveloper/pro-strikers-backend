import { model, Schema } from 'mongoose';
import { IWebPayment } from './webPayment.interface';

const WebPaymentSchema = new Schema<IWebPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const WebPayment = model<IWebPayment>('WebPayment', WebPaymentSchema);

export default WebPayment;
