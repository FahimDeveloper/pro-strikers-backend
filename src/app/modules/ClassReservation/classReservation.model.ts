import { Schema, model } from 'mongoose';
import { IClassReservation } from './classReservation.interface';

const classReservationSchema = new Schema<IClassReservation>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
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
    class_date: { type: String, required: true },
    voucher_applied: { type: Boolean, required: true },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    sport: { type: String, required: true },
    zip_code: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const ClassReservation = model<IClassReservation>(
  'ClassReservation',
  classReservationSchema,
);
