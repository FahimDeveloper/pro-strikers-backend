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
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      email: { type: String, required: true },
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
      payment: {
        type: Schema.Types.ObjectId,
        ref: 'AppointmentPayment',
        required: true,
      },
      voucher_applied: { type: Boolean, required: true, default: false },
      sport: { type: String, required: true },
      bookings: { type: [AppointmentBookingsSchema], required: true },
    },
    { versionKey: false, timestamps: true },
  );

export const AppointmentOneOnOneReservation =
  model<IAppointmentOneOnOneReservation>(
    'AppointmentOneOnOneReservation',
    appointmentOneOnOneReservationSchema,
  );
