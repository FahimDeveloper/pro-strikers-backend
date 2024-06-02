import { StringExpression } from 'mongoose';

export interface IEvent {
  event_name: string;
  event_type: string;
  sport: string;
  start_date: string;
  end_date: string;
  location: string;
  registration_start: string;
  registration_end: string;
  allowed_registrations: number;
  registration: number;
  image?: string;
  description: string;
  price: number;
}
