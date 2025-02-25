import { Schema, model } from 'mongoose';
import { IAddon, IFacilityReservation } from './facilityReservation.interface';

const FacilityBookingsSchema = new Schema(
  {
    date: { type: String, required: true },
    time_slot: { type: String, required: true },
    lane: { type: String, required: true },
    training: { type: Schema.Types.ObjectId, ref: 'Training', required: true },
  },
  { versionKey: false, _id: false },
);

const AddonBookingsSchema = new Schema<IAddon>(
  {
    name: { type: String, required: true },
    hours: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    ini_price: { type: Number, required: true },
  },
  { versionKey: false, _id: false },
);

const FacilityReservationSchema = new Schema<IFacilityReservation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: { type: String, required: true },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'FacilitySchedules',
      required: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'FacilityPayment',
      required: true,
    },
    voucher_applied: { type: Boolean, required: true, default: false },
    sport: { type: String, required: true },
    confirmed: { type: Boolean, default: true },
    temp_duration: { type: String, default: false },
    payment_link: { type: String, default: false },
    bookings: { type: [FacilityBookingsSchema], required: true },
    addons: { type: [AddonBookingsSchema] },
  },
  { versionKey: false, timestamps: true },
);

export const FacilityReservation = model<IFacilityReservation>(
  'FacilityReservation',
  FacilityReservationSchema,
);
