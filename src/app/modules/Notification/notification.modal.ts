import { model, Schema } from 'mongoose';
import { INotification } from './notification.interface';

const notificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'facility',
        'one-appointment',
        'group-appointment',
        'individual-tournament',
        'group-tournament',
        'class',
        'bootcamp',
      ],
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

const Notification = model<INotification>('Notification', notificationSchema);

export default Notification;
