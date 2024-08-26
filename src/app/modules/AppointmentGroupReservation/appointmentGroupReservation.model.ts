import { Schema, model } from 'mongoose';
import { IAppointmentGroupReservation } from './appointmentGroupReservation.interface';

const AppointmentGroupMembersSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { versionKey: false, _id: false },
);

// Interface for IAppointmentBookings
const AppointmentBookingsSchema = new Schema(
  {
    date: { type: String, required: true },
    time_slot: { type: String, required: true },
    training: { type: Schema.Types.ObjectId, ref: 'Training', required: true },
  },
  { versionKey: false, _id: false },
);

const AppointmentGroupReservationSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'AppointmentSchedule',
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    sport: { type: String, required: true },
    zip_code: { type: String, required: true },
    team_name: { type: String, required: true },
    team: { type: [AppointmentGroupMembersSchema], required: true },
    bookings: { type: [AppointmentBookingsSchema], required: true },
  },
  { versionLey: false, timestamps: true },
);

export const AppointmentGroupReservation = model<IAppointmentGroupReservation>(
  'AppointmentGroupReservation',
  AppointmentGroupReservationSchema,
);
