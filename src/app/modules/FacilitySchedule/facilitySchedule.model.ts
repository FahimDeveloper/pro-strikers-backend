import { Schema, model } from 'mongoose';
import {
  IFacilityDaySchedule,
  IFacilitySchedule,
  ILaneFacilities,
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
const facilityScheduleLaneSchema = new Schema<ILaneFacilities>(
  {
    lane_type: {
      type: String,
      required: true,
    },
    lane_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
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
    category: {
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
    lane_facilities: [facilityScheduleLaneSchema],
    schedules: [facilityScheduleDaySchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const FacilitySchedule = model<IFacilitySchedule>(
  'FacilitySchedule',
  facilityScheduleSchema,
);
