import mongoose from 'mongoose';

export interface IFacilityReservation {
  user: mongoose.Types.ObjectId;
  email: string;
  voucher_applied: boolean;
  confirmed: boolean;
  temp_duration?: string;
  payment_link?: string;
  facility: mongoose.Types.ObjectId;
  payment: mongoose.Types.ObjectId;
  sport: string;
  bookings: IFacilityBookings[];
  addons: IAddon[];
  createdAt: Date;
  updatedAt: Date;
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

export interface IFacilityReservationRequest {
  facility_data: {
    first_name: string;
    last_name: string;
    email: string;
    voucher_applied: boolean;
    confirmed: boolean;
    temp_duration?: string;
    facility: mongoose.Types.ObjectId;
    payment: mongoose.Types.ObjectId;
    sport: string;
    bookings: IFacilityBookings[];
    addons: IAddon[];
  };
  payment_info: {
    transaction_id: string;
    amount: number;
    email: string;
  };
}
