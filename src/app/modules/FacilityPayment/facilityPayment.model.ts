import { model, Schema } from 'mongoose';
import { IFacilityPayment } from './facilityPayment.interface';

const FacilityPaymentSchema = new Schema<IFacilityPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const FacilityPayment = model<IFacilityPayment>(
  'FacilityPayment',
  FacilityPaymentSchema,
);

export default FacilityPayment;
