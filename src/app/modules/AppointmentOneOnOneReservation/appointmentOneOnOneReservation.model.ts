import { Schema, model } from 'mongoose';
import { IAppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.interface';

// Interface for IAppointmentBookings
const AppointmentBookingsSchema = new Schema(
  {
    date: { type: String, required: true },
    time_slot: { type: String, required: true },
    training: { type: Schema.Types.ObjectId, ref: 'Training', required: true },
  },
  { versionKey: false, _id: false },
);

const appointmentOneOnOneReservationSchema =
  new Schema<IAppointmentOneOnOneReservation>(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      age: { type: Number, required: true },
      appointment: {
        type: Schema.Types.ObjectId,
        ref: 'OneAppointmentSchedule',
        required: true,
      },
      trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
      },
      voucher_applied: { type: Boolean, required: true, default: false },
      street_address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      sport: { type: String, required: true },
      zip_code: { type: String, required: true },
      bookings: { type: [AppointmentBookingsSchema], required: true },
    },
    { versionKey: false, timestamps: true },
  );

export const AppointmentOneOnOneReservation =
  model<IAppointmentOneOnOneReservation>(
    'AppointmentOneOnOneReservation',
    appointmentOneOnOneReservationSchema,
  );
