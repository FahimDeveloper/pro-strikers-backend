import { model, Schema, Types } from 'mongoose';
import {
  IAttendance,
  IAttendanceTime,
  IBundleCreditPack,
} from './bundleCreditPack.interface';

const TimeSchema = new Schema<IAttendanceTime>(
  {
    cage: { type: String, required: true },
    hour: { type: Number, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
  },
  { _id: false, versionKey: false },
);

const attendanceSchema = new Schema<IAttendance>(
  {
    date: {
      type: String,
      required: true,
    },
    times: [TimeSchema],
  },
  { id: false, versionKey: false },
);

const bundleCreditPackageSchema = new Schema<IBundleCreditPack>(
  {
    package: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    payment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'FacilityPayment',
    },
    email: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    validity: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    piching_machine: {
      type: Boolean,
      required: true,
    },
    attendance: [attendanceSchema],
  },
  { versionKey: false, timestamps: true },
);

export const BundleCreditPackage = model<IBundleCreditPack>(
  'BundleCreditPackage',
  bundleCreditPackageSchema,
);
