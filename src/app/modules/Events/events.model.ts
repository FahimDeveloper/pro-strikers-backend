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
    event_sport: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    registration_start: {
      type: Date,
      required: true,
    },
    registration_end: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    event_description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Event = model<IEvent>('Event', eventSchema);
