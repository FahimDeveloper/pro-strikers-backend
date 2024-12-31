import { model, Schema } from 'mongoose';
import { ISlotBooking } from './slotBooking.interface';

const slotBookingSchema = new Schema<ISlotBooking>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      indexes: true,
    },
    training: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    time_slot: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    lane: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

slotBookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

export const SlotBooking = model<ISlotBooking>(
  'SlotBooking',
  slotBookingSchema,
);
