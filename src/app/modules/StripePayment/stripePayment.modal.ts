import { Schema, model } from 'mongoose';
import { IStripePayment } from './stripePayment.interface';

const StripePaymentSchema = new Schema<IStripePayment>(
  {
    email: { type: String, required: true },
    customer_id: { type: String, required: true },
    subscription_id: { type: String },
    subcription_plan: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StripePayment = model<IStripePayment>(
  'StripePayment',
  StripePaymentSchema,
);
