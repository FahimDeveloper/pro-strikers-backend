import mongoose from 'mongoose';

export interface IBundleCreditPack {
  package: string;
  email: string;
  hours: number;
  validity: string;
  attendance: Array<IAttendance>;
  piching_machine: boolean;
  active: boolean;
}

export interface IBundleCreditPackPurchase {
  bundle: IBundleCreditPack;
  payment_info: {
    transaction_id: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    email: string;
    service: string;
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
