import { Schema, model } from 'mongoose';
import {
  IOneAppointmentDaySchedule,
  IOneAppointmentSchedule,
} from './oneAppointmentSchedule.interface';

const appointmentScheduleDaySchema = new Schema<IOneAppointmentDaySchedule>(
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

const appointmentScheduleSchema = new Schema<IOneAppointmentSchedule>(
  {
    appointment_name: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
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

appointmentScheduleSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const OneAppointmentSchedule = model<IOneAppointmentSchedule>(
  'OneAppointmentSchedule',
  appointmentScheduleSchema,
);
