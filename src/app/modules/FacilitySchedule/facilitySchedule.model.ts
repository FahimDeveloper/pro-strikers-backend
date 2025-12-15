import { Schema, model } from 'mongoose';
import {
  IFacilityDaySchedule,
  IFacilitySchedule,
  IOpenArea,
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
  { _id: false, versionKey: false },
);

// const openAreaSchema = new Schema<IOpenArea>(
//   {
//     active: {
//       type: Boolean,
//     },
//     durations: {
//       type: Number,
//     },
//     ini_price: {
//       type: Number,
//     },
//     price: {
//       type: Number,
//     },
//   },
//   { _id: false, versionKey: false },
// );

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
    ini_price: {
      type: Number,
      required: true,
    },
    // open_arena_price: {
    //   type: Number,
    // },
    lanes: {
      type: [String],
      required: true,
    },
    schedules: [facilityScheduleDaySchema],
  },
  { timestamps: true, versionKey: false },
);

export const FacilitySchedule = model<IFacilitySchedule>(
  'FacilitySchedules',
  facilityScheduleSchema,
);
