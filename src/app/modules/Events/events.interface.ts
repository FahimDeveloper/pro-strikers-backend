export interface IEvent {
  event_name: string;
  event_type: string;
  event_sport: string;
  start_date: Date;
  end_date: Date;
  location: string;
  registration_start: Date;
  registration_end: Date;
  total_registrations: number;
  image: string;
  event_description: string;
  price: number;
}
