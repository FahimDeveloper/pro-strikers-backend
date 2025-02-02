import { Request, Response } from 'express';
import Notification from './notification.modal';
import { io } from '../../../server';
import QueryBuilder from '../../builder/QueryBuilder';

const getNotificationFromDB = async (query: Record<string, unknown>) => {
  const notificationQuery = new QueryBuilder(
    Notification.find(),
    query,
  ).paginate();
  const result = await notificationQuery?.modelQuery;
  const count = await notificationQuery?.countTotal();
  return {
    count,
    result,
  };
};

const notificationUpdate = async () => {
  const result = await Notification.updateMany({ read: false }, { read: true });
  if (result) {
    io.emit('notification', 'new-notification');
  }
};

export const NotificationServices = {
  getNotificationFromDB,
  notificationUpdate,
};
