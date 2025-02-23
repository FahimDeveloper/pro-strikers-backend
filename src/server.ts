import mongoose from 'mongoose';
import config from './app/config';
import { app } from './app'; // Import the Express app
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NotificationServices } from './app/modules/Notification/notification.services';
import { startMembershipCronJob } from './app/utils/membershipCronJob';

const port = process.env.PORT || config.port;

// Create the HTTP server with your existing Express app
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the server
const io = new SocketIOServer(server, {
  connectionStateRecovery: {},
  cors: {
    origin: '*',
    credentials: true,
  },
});

// Database connection
async function dbConnection() {
  const url = config.database_local_url;
  try {
    await mongoose.connect(url as string);
    startMembershipCronJob();
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    io.on('connection', socket => {
      socket.on('up-notification', msg => {
        if (msg == 'update-notifications') {
          NotificationServices.notificationUpdate();
        }
      });

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}
dbConnection();

process.on('uncaughtException', err => {
  console.error('Uncaught exception detected:', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('unhandledRejection', reason => {
  console.error('Unhandled rejection detected:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

export { io };
