import { model, Schema } from 'mongoose';
import { IAppointmentPayment } from './appointmentPayment.interface';

const AppointmentPaymentSchema = new Schema<IAppointmentPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const AppointmentPayment = model<IAppointmentPayment>(
  'AppointmentPayment',
  AppointmentPaymentSchema,
);

export default AppointmentPayment;
