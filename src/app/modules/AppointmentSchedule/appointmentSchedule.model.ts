import { Schema, Types, model } from 'mongoose';
import {
  IAppointmentDaySchedule,
  IAppointmentSchedule,
} from './appointmentSchedule.interface';

const appointmentScheduleDaySchema = new Schema<IAppointmentDaySchedule>(
  {
    day: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
  },
  { _id: false },
);

const appointmentScheduleSchema = new Schema<IAppointmentSchedule>(
  {
    appointment_name: {
      type: String,
      required: true,
    },
    appointment_type: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    appointment_duration: {
      type: Number,
      required: true,
    },
    trainer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    schedules: [appointmentScheduleDaySchema],
  },
  { timestamps: true, versionKey: false },
);

export const AppointmentSchedule = model<IAppointmentSchedule>(
  'AppointmentSchedule',
  appointmentScheduleSchema,
);
