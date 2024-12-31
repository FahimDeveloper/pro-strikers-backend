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
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'FacilitySchedules',
      required: true,
    },
    street_address: { type: String, required: true },
    voucher_applied: { type: Boolean, required: true, default: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    sport: { type: String, required: true },
    zip_code: { type: String, required: true },
    bookings: { type: [FacilityBookingsSchema], required: true },
    addons: { type: [AddonBookingsSchema] },
  },
  { versionKey: false, timestamps: true },
);

export const FacilityReservation = model<IFacilityReservation>(
  'FacilityReservation',
  FacilityReservationSchema,
);
