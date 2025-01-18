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
    contact: { type: String, required: true },
  },
  { _id: false, versionKey: false },
);

const eventGroupReservationSchema = new Schema<IEventGroupReservation>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    email: { type: String, required: true },
    payment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'TournamentPayment',
    },
    voucher_applied: { type: Boolean, required: true, default: false },
    sport: { type: String, required: true },
    team_name: { type: String, required: true },
    team: [eventGroupMemberSchema],
  },
  { timestamps: true, versionKey: false },
);

export const EventGroupReservation = model<IEventGroupReservation>(
  'EventGroupReservation',
  eventGroupReservationSchema,
);
