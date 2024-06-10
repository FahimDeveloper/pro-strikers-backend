import { Schema, model } from 'mongoose';
import { IClassReservation } from './classReservation.interface';

const classReservationSchema = new Schema<IClassReservation>(
  {
    user_email: {
      type: String,
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'ClassesSchedule',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    trainer: {
      type: String,
      required: true,
    },
    issue_date: {
      type: String,
      required: true,
    },
    class_date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ClassReservation = model<IClassReservation>(
  'ClassReservation',
  classReservationSchema,
);
