import { Schema, model } from 'mongoose';
import { IResetPass } from './resetPass.interface';

const resetPassSchema = new Schema<IResetPass>(
  {
    email: {
      type: String,
      required: true,
    },
    code: { type: Number, required: true },
  },
  { timestamps: true },
);

// resetPassSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export const ResetPass = model<IResetPass>('ResetPass', resetPassSchema);
