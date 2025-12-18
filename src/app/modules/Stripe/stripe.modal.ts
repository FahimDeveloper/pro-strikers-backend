import { Schema, model } from 'mongoose';
import { IStripeMembershipCustomer } from './stripe.interface';

const StripeMembershipCustomerSchema = new Schema<IStripeMembershipCustomer>(
  {
    email: { type: String, required: true },
    is_actived: { type: Boolean, required: true, default: false },
    customer_id: { type: String, required: true },
    subscription_id: { type: String },
    subscription_plan: { type: String },
    subscription: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StripeMembershipCustomer = model<IStripeMembershipCustomer>(
  'StripeMembershipCustomer',
  StripeMembershipCustomerSchema,
);
