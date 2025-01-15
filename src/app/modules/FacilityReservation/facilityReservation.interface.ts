import mongoose from 'mongoose';

export interface IFacilityReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  voucher_applied: boolean;
  facility: mongoose.Types.ObjectId;
  payment: mongoose.Types.ObjectId;
  sport: string;
  bookings: IFacilityBookings[];
  addons: IAddon[];
}

export interface IAddon {
  name: string;
  hours: number;
  image: string;
  type: string;
  ini_price: number;
  price: number;
}

export interface IFacilityBookings {
  date: string;
  time_slot: string;
  training: mongoose.Types.ObjectId;
}

export interface IFacilityReservationByAdmin {
  facility_data: IFacilityReservation;
  amount: number;
}

export interface IFacilityReservationByUser {
  facility_data: IFacilityReservation;
  payment_info: {
    transaction_id: string;
    amount: number;
    email: string;
  };
}
