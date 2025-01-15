import { model, Schema } from 'mongoose';
import { ITournamentPayment } from './tournamentPayment.interface';

const TournamentPaymentSchema = new Schema<ITournamentPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const TournamentPayment = model<ITournamentPayment>(
  'TournamentPayment',
  TournamentPaymentSchema,
);

export default TournamentPayment;
