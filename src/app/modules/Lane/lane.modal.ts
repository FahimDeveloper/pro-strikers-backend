import { Schema, model } from 'mongoose';
import { ILane } from './lane.interface';

const LaneSchema = new Schema<ILane>(
  {
    lane_title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Lane = model<ILane>('Lane', LaneSchema);
