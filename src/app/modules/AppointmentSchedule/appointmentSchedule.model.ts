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
      type: Date,
    },
    end_time: {
      type: Date,
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
      type: Schema.Types.ObjectId,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const AppointmentSchedule = model<IAppointmentSchedule>(
  'AppointmentSchedule',
  appointmentScheduleSchema,
);
