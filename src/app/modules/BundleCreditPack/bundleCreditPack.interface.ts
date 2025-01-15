import mongoose from 'mongoose';

export interface IBundleCreditPack {
  user: mongoose.Types.ObjectId;
  package: string;
  email: string;
  hours: number;
  validity: string;
  attendance: Array<IAttendance>;
  piching_machine: boolean;
  payment: mongoose.Types.ObjectId;
  active: boolean;
}

export interface IBundleCreditPackPurchase {
  bundle: IBundleCreditPack;
  payment_info: {
    transaction_id: string;
    amount: number;
    email: string;
  };
}

export interface IAttendance {
  date: string;
  times: Array<IAttendanceTime>;
}

export interface IAttendanceTime {
  cage: string;
  hour: number;
  start_time: string;
  end_time: string;
}
