import { model, Schema } from 'mongoose';

const tempLinkSchema = new Schema<ITempLink>(
  {
    type: {
      type: String,
      required: true,
      enum: ['facility', 'appointment', 'class', 'course', 'membership'],
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

tempLinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TempLink = model<ITempLink>('TempLink', tempLinkSchema);
