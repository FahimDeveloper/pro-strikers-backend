import mongoose from 'mongoose';

export interface IFacilityReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  voucher_applied: boolean;
  facility: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
  bookings: IFacilityBookings[];
}

export interface IFacilityBookings {
  date: string;
  time_slot: string;
  training: mongoose.Types.ObjectId;
}

export interface IFacilityReservationByUser {
  facility_data: IFacilityReservation;
  membership_info?: {
    user_id: mongoose.Types.ObjectId;
    membership: {
      package: string;
      plan: string;
      status: boolean;
      membership: boolean;
      issue_date: string;
      expiry_date: string;
    };
  };
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
  };
}
