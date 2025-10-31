import { Schema, model } from 'mongoose';
import { IClassReservation } from './classReservation.interface';

const classReservationSchema = new Schema<IClassReservation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: { type: String, required: true },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'ClassesSchedule',
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    academy: {
      type: Schema.Types.ObjectId,
      ref: 'Academy',
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'ClassPayment',
      required: true,
    },
    class_date: { type: String, required: true },
    voucher_applied: { type: Boolean, required: true, default: false },
    sport: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const ClassReservation = model<IClassReservation>(
  'ClassReservation',
  classReservationSchema,
);
