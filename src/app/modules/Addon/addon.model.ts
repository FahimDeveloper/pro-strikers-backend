import { Schema, model } from 'mongoose';
import { IAddon, IAddonInfo } from './addon.interface';

const AddonSchema = new Schema<IAddon>(
  {
    addon_title: {
      type: String,
      required: true,
    },
    addon_description: {
      type: String,
      required: true,
    },
    // addon_manage: {
    //   type: String,
    //   enum: ['hourly', 'half_hourly'],
    //   required: true,
    // },
    addon_price: {
      type: Number,
      required: true,
    },
    addon_ini_price: {
      type: Number,
      required: true,
    },
    addon_image: {
      type: String,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const AddonInfoSchema = new Schema<IAddonInfo>(
  {
    sport: {
      type: String,
      required: true,
      unique: true,
    },
    facility: {
      type: String,
      required: true,
    },
    addons: [AddonSchema],
  },
  { timestamps: true, versionKey: false },
);

export const Addon = model<IAddonInfo>('Addon', AddonInfoSchema);
