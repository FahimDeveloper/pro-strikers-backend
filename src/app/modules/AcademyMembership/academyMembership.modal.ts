import { model, Schema } from 'mongoose';
import { IAcademyMembership } from './academyMembership.interface';

const academyMembershipSchema = new Schema<IAcademyMembership>(
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

export const AcademyMembership = model<IAcademyMembership>(
  'AcademyMembership',
  academyMembershipSchema,
);
