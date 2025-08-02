import { Schema, model } from 'mongoose';
import { ICustomMembership } from './customMembership.Interface';

const CustomMembershipSchema = new Schema<ICustomMembership>(
  {
    product_id: { type: String, required: true },
    price_id: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    billing_cycle: { type: String, enum: ['month', 'year'], required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const CustomMembership = model(
  'CustomMembership',
  CustomMembershipSchema,
);
