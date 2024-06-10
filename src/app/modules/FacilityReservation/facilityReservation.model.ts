import { Schema, model } from 'mongoose';
import { IFacilityReservation } from './facilityReservation.interface';

const appointmentReservationSchema = new Schema<IFacilityReservation>(
  {
    user_email: {
      type: String,
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'FacilitySchedules',
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
    issue_date: {
      type: String,
      required: true,
    },
    facility_date: {
      type: String,
      required: true,
    },
    time_slots: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const FacilityReservation = model<IFacilityReservation>(
  'FacilityReservation',
  appointmentReservationSchema,
);
