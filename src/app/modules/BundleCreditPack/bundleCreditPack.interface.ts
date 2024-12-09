import mongoose from 'mongoose';

export interface IBundleCreditPack {
  package: string;
  user: string;
  hours: number;
  validity: Date;
  attendance: Array<IAttendance>;
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
  date: Date;
  times: Array<{
    hour: number;
    start_time: Date;
    end_time: Date;
  }>;
}
