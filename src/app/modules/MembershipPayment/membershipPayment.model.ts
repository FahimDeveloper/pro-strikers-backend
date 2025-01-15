import { model, Schema } from 'mongoose';
import { IMembershipPayment } from './membershipPayment.interface';

const MembershipPaymentSchema = new Schema<IMembershipPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const MembershipPayment = model<IMembershipPayment>(
  'MembershipPayment',
  MembershipPaymentSchema,
);

export default MembershipPayment;
