import { Schema, model } from 'mongoose';
import { ICourseReservation } from './coursesReservation.interface';

const courseReservationSchema = new Schema<ICourseReservation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    email: { type: String, required: true },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'CoursesSchedule',
    },
    voucher_applied: { type: Boolean, required: true, default: false },
    trainer: { type: Schema.Types.ObjectId, required: true, ref: 'Admin' },
    payment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'BootcampPayment',
    },
    sport: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const CourseReservation = model<ICourseReservation>(
  'CourseReservation',
  courseReservationSchema,
);
