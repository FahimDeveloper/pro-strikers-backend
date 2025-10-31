import mongoose, { Schema } from 'mongoose';
import { IAcademy } from './academy.interfaces';

const AcademySchema = new Schema<IAcademy>(
  {
    academy_title: { type: String, required: true },
    sport: { type: String, required: true },
    academy_membership_title: { type: String, required: true },
    academy_membership_price: { type: Number, required: true },
    academy_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: false,
    },
    description: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const AcademyModel = mongoose.model<IAcademy>('Academy', AcademySchema);
