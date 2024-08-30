import { Schema, model } from 'mongoose';
import {
  IFacilityDaySchedule,
  IFacilitySchedule,
} from './facilitySchedule.interface';

const facilityScheduleDaySchema = new Schema<IFacilityDaySchedule>(
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

const facilityScheduleSchema = new Schema<IFacilitySchedule>(
  {
    facility_name: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    facility: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
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
    lane: {
      type: String,
      required: true,
    },
    schedules: [facilityScheduleDaySchema],
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

facilityScheduleSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const FacilitySchedule = model<IFacilitySchedule>(
  'FacilitySchedules',
  facilityScheduleSchema,
);
