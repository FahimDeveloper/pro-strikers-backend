import { Schema, model } from 'mongoose';
import { IAppointmentOneOnOneReservation } from './appointmentOneOnOneReservation.interface';

const appointmentOneOnOneReservationSchema =
  new Schema<IAppointmentOneOnOneReservation>({
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
    time_slots: {
      type: [String],
      required: true,
    },
  });

export const AppointmentOneOnOneReservation =
  model<IAppointmentOneOnOneReservation>(
    'AppointmentOneOnOneReservation',
    appointmentOneOnOneReservationSchema,
  );
