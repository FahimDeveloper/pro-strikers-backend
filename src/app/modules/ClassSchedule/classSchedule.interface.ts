import { Types } from 'mongoose';

export interface IClassSchedule {
  _id: Types.ObjectId;
  class_name: string;
  sport: string;
  description: string;
  facility: string;
  trainer: Types.ObjectId;
  level: string;
  start_date: string;
  end_date: string;
  capacity: number;
  price: number;
  schedules: IClassDaySchedule[];
}

export interface IClassDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
