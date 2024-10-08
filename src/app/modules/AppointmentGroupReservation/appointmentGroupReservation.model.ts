import { Schema, model } from 'mongoose';
import { IAppointmentGroupReservation } from './appointmentGroupReservation.interface';

const AppointmentGroupReservationSchema =
  new Schema<IAppointmentGroupReservation>(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      age: { type: Number, required: true },
      appointment: {
        type: Schema.Types.ObjectId,
        ref: 'GroupAppointmentSchedule',
        required: true,
      },
      trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
      },
      appointment_date: { type: String, required: true },
      voucher_applied: { type: Boolean, required: true, default: false },
      street_address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      sport: { type: String, required: true },
      zip_code: { type: String, required: true },
    },
    { versionKey: false, timestamps: true },
  );

export const AppointmentGroupReservation = model<IAppointmentGroupReservation>(
  'AppointmentGroupReservation',
  AppointmentGroupReservationSchema,
);
