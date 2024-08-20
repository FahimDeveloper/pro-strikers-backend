import { Schema, model } from 'mongoose';
import { ICourseReservation } from './coursesReservation.interface';

const courseReservationSchema = new Schema<ICourseReservation>(
  {
    player_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'CoursesSchedule',
    },
    trainer: { type: String, required: true },
    age: { type: Number, required: true },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    sport: { type: String, required: true },
    zip_code: { type: String, required: true },
    skill_level: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const CourseReservation = model<ICourseReservation>(
  'CourseReservation',
  courseReservationSchema,
);
