import { Schema, model } from 'mongoose';
import { IClassDaySchedule, IClassSchedule } from './classSchedule.interface';

const classScheduleDaySchema = new Schema<IClassDaySchedule>(
  {
    day: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
  },
  { _id: false },
);

const classScheduleSchema = new Schema<IClassSchedule>(
  {
    class_name: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    facility: {
      type: String,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    schedules: [classScheduleDaySchema],
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

export const ClassSchedule = model<IClassSchedule>(
  'ClassesSchedule',
  classScheduleSchema,
);
