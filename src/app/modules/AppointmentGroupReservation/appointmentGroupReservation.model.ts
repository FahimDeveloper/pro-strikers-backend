import { Schema, model } from 'mongoose';
import { IAppointmentGroupReservation } from './appointmentGroupReservation.interface';

const AppointmentGroupReservationSchema =
  new Schema<IAppointmentGroupReservation>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      email: { type: String, required: true },
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
      payment: {
        type: Schema.Types.ObjectId,
        ref: 'AppointmentPayment',
        required: true,
      },
      appointment_date: { type: String, required: true },
      voucher_applied: { type: Boolean, required: true, default: false },
      sport: { type: String, required: true },
    },
    { versionKey: false, timestamps: true },
  );

export const AppointmentGroupReservation = model<IAppointmentGroupReservation>(
  'AppointmentGroupReservation',
  AppointmentGroupReservationSchema,
);
