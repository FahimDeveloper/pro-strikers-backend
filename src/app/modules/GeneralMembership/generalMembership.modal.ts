import { model, Schema } from 'mongoose';
import { IGeneralMembership } from './generalMembership.interface';

const generalMembershipSchema = new Schema<IGeneralMembership>(
  {
    email: { type: String, required: true },
    customer_id: { type: String, required: true },
    subscription_id: { type: String, index: true },
    subscription_plan: { type: String },
    // is_offer_subscription: {
    //   applied: { type: Boolean, default: false },
    //   coupon: { type: String },
    // },
    subscription: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const GeneralMembership = model<IGeneralMembership>(
  'GeneralMembership',
  generalMembershipSchema,
);
