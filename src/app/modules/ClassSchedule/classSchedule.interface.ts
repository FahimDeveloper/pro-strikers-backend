import { Types } from 'mongoose';

export interface IClassSchedule {
  _id: Types.ObjectId;
  class_name: string;
  sport: string;
  description: string;
  trainer: Types.ObjectId;
  level: string;
  capacity: number;
  price: number;
  academy?: Types.ObjectId;
  schedules: IClassDaySchedule[];
}

export interface IClassDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
