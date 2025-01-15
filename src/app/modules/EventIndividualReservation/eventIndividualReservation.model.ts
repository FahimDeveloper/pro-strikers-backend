import { model, Schema } from 'mongoose';
import { IEventIndividualReservation } from './eventIndividualReservation.interface';

const eventIndividualReservationSchema =
  new Schema<IEventIndividualReservation>(
    {
      user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      email: { type: String, required: true, index: true },
      event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
      payment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'TournamentPayment',
      },
      voucher_applied: { type: Boolean, required: true, default: false },
      sport: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
  );

export const EventIndividualReservation = model<IEventIndividualReservation>(
  'EventIndividualReservation',
  eventIndividualReservationSchema,
);
