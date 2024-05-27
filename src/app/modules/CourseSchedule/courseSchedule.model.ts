import { Schema, model } from 'mongoose';
import { ICourseSchedule } from './courseSchedule.interface';

const courseScheduleSchema = new Schema<ICourseSchedule>(
  {
    course_name: {
      type: String,
      required: true,
      index: true,
    },
    sport: {
      type: String,
      required: true,
    },
    trainer: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const CourseSchedule = model<ICourseSchedule>(
  'CoursesSchedule',
  courseScheduleSchema,
);
