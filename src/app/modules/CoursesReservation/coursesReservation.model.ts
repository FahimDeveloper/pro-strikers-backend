import { Schema, model } from 'mongoose';
import { ICourseReservation } from './coursesReservation.interface';

const courseReservationSchema = new Schema<ICourseReservation>(
  {
    user_email: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'CoursesSchedule',
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
    course_date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const CourseReservation = model<ICourseReservation>(
  'CourseReservation',
  courseReservationSchema,
);
