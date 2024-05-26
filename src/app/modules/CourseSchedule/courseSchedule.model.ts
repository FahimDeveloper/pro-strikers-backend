import { Schema, model } from 'mongoose';
import { ICourseSchedule } from './courseSchedule.interface';

const courseScheduleSchema = new Schema<ICourseSchedule>(
  {
    class_name: {
      type: String,
      required: true,
      index: true,
    },
    sport: {
      type: String,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
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
