import { Schema, model } from 'mongoose';
import { IEvent } from './events.interface';

const eventSchema = new Schema<IEvent>(
  {
    event_name: {
      type: String,
      required: true,
    },
    event_type: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    registration_start: {
      type: String,
      required: true,
    },
    registration_end: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    allowed_registrations: {
      type: Number,
      required: true,
    },
    registration: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Event = model<IEvent>('Event', eventSchema);
