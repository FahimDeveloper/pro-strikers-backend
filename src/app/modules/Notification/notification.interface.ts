export interface INotification {
  title: string;
  message: string;
  read: boolean;
  type:
    | 'facility'
    | 'one-appointment'
    | 'group-appointment'
    | 'individual-tournament'
    | 'group-tournament'
    | 'class'
    | 'bootcamp';
}
