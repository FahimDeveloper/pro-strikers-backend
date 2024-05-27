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
    facility_duration: {
      type: Number,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true },
);

export const FacilitySchedule = model<IFacilitySchedule>(
  'FacilitySchedule',
  facilityScheduleSchema,
);
