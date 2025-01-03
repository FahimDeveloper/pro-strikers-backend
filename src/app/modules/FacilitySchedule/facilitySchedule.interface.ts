import { Types } from 'mongoose';

export interface IFacilitySchedule {
  _id: Types.ObjectId;
  facility_name: string;
  sport: string;
  facility: string;
  duration: number;
  description: string;
  price: number;
  ini_price: number;
  lanes: Array<string>;
  // open_area?: IOpenArea;
  schedules: Array<IFacilityDaySchedule>;
}

export interface IOpenArea {
  active: boolean;
  durations: number;
  ini_price: number;
  price: number;
}

export interface IFacilityDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}
