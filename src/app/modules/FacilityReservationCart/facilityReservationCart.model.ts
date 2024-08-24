import { model, Schema } from 'mongoose';
import { IFacilityReservationCart } from './facilityReservationCart.interface';

const facilityReservationCartSchema = new Schema<IFacilityReservationCart>({
  facility: {
    type: Schema.Types.ObjectId,
    ref: 'FacilitySchedules',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time_slot: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const facilityReservationCart = model<IFacilityReservationCart>(
  'facilityReservationCart',
  facilityReservationCartSchema,
);
