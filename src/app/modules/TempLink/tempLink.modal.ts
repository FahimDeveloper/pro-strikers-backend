import { model, Schema } from 'mongoose';

const tempLinkSchema = new Schema<ITempLink>(
  {
    type: {
      type: String,
      required: true,
      enum: ['facility', 'appointment', 'class', 'course'],
    },
    token: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

tempLinkSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

export const TempLink = model<ITempLink>('TempLink', tempLinkSchema);
