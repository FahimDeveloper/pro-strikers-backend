import { model, Schema } from 'mongoose';
import { IEventIndividualReservation } from './eventIndividualReservation.interface';

const eventIndividualReservationSchema =
  new Schema<IEventIndividualReservation>(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
      age: { type: Number, required: true },
      street_address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      sport: { type: String, required: true },
      zip_code: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
  );

export const EventIndividualReservation = model<IEventIndividualReservation>(
  'EventIndividualReservation',
  eventIndividualReservationSchema,
);
