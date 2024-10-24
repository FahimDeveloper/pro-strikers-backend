import { Types } from 'mongoose';

export interface ICourseSchedule {
  course_name: string;
  sport: string;
  trainer: Types.ObjectId;
  capacity: number;
  enrolled: number;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  price: number;
}
