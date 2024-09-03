import { Schema, model } from 'mongoose';
import { IAddon, ILane } from './lane.interface';

const AddonSchema = new Schema<IAddon>({
  addon_title: {
    type: String,
    required: true,
  },
  addon_description: {
    type: String,
    required: true,
  },
  addon_price: {
    type: Number,
    required: true,
  },
});

const LaneSchema = new Schema<ILane>(
  {
    lane_title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    addon: {
      type: Boolean,
      required: true,
    },
    addons: [AddonSchema],
  },
  { timestamps: true, versionKey: false },
);

export const Lane = model<ILane>('Lane', LaneSchema);
