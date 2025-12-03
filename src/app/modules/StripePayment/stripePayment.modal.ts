import { Schema, model } from 'mongoose';
import { IStripePayment } from './stripePayment.interface';

const StripePaymentSchema = new Schema<IStripePayment>(
  {
    email: { type: String, required: true },
    customer_id: { type: String, required: true },
    subscription_id: { type: String },
    subscription_plan: { type: String },
    invoice_count: { type: Number, default: 0 },
    is_offer_subscription: {
      applied: { type: Boolean, default: false },
      coupon: { type: String },
    },
    subscription: { type: String },
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
