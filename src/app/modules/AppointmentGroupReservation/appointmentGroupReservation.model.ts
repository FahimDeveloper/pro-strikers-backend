import { Schema, model } from 'mongoose';
import { IAppointmentGroupReservation } from './appointmentGroupReservation.interface';

const appointmentGroupReservationSchema =
  new Schema<IAppointmentGroupReservation>({
    user_email: {
      type: String,
      required: true,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'AppointmentSchedule',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    trainer: {
      type: String,
      required: true,
    },
    booking_date: {
      type: String,
      required: true,
    },
  });

export const AppointmentGroupReservation = model<IAppointmentGroupReservation>(
  'AppointmentGroupReservation',
  appointmentGroupReservationSchema,
);
