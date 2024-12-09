import { model, Schema } from 'mongoose';
import { IAttendance, IBundleCreditPack } from './bundleCreditPack.interface';

const TimeSchema = new Schema(
  {
    hour: { type: Number, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
  },
  { _id: false },
);

const attendanceSchema = new Schema<IAttendance>(
  {
    date: {
      type: Date,
      required: true,
    },
    times: [TimeSchema],
  },
  { id: false },
);

const bundleCreditPackageSchema = new Schema<IBundleCreditPack>({
  package: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  validity: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  attendance: [attendanceSchema],
});

export const BundleCreditPackage = model<IBundleCreditPack>(
  'BundleCreditPackage',
  bundleCreditPackageSchema,
);
