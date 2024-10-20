import { model, Schema } from 'mongoose';
import { IMembershipCancellation } from './membershipCancellation.interface';

const MembershipCancellationSchema = new Schema<IMembershipCancellation>(
  {
    email: {
      type: String,
      required: true,
    },
    package_name: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pendin', 'processing', 'completed', 'deny'],
      default: 'pending',
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const MembershipCancellation = model<IMembershipCancellation>(
  'MembershipCancellation',
  MembershipCancellationSchema,
);
