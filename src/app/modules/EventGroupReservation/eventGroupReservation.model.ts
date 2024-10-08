import { model, Schema } from 'mongoose';
import {
  IEventGroupMembers,
  IEventGroupReservation,
} from './eventGroupReservation.interface';

const eventGroupMemberSchema = new Schema<IEventGroupMembers>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    contact: { type: String, required: true },
  },
  { _id: false },
);

const eventGroupReservationSchema = new Schema<IEventGroupReservation>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    age: { type: Number, required: true },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    voucher_applied: { type: Boolean, required: true, default: false },
    // preferred_time: { type: String, required: true },
    // preferred_date: { type: String, required: true },
    state: { type: String, required: true },
    sport: { type: String, required: true },
    zip_code: { type: String, required: true },
    team_name: { type: String, required: true },
    team: [eventGroupMemberSchema],
  },
  { timestamps: true, versionKey: false },
);

export const EventGroupReservation = model<IEventGroupReservation>(
  'EventGroupReservation',
  eventGroupReservationSchema,
);
