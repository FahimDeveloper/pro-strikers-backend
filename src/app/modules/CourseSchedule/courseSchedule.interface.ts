import { Types } from 'mongoose';

export interface ICourseSchedule {
  _id: Types.ObjectId;
  class_name: string;
  sport: string;
  trainer: Types.ObjectId;
  capacity: number;
  description: string;
  start_date: Date;
  end_date: Date;
  start_time: Date;
  end_time: Date;
  price: number;
  isDeleted: boolean;
}
