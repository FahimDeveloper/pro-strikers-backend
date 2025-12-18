import mongoose from 'mongoose';
import config from './app/config';
import { app } from './app'; // Import the Express app
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NotificationServices } from './app/modules/Notification/notification.services';
import {
  startMembershipCronJob,
  startMonthlyCreditCron,
  startProvideCreditForExistingUsersCron,
  startTempFacilityReservationCronJob,
} from './app/utils/cronJob';
import { User } from './app/modules/User/user.model';

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

// const migrateUsersToNewMembershipSchema = async () => {
//   const users = await User.find({}).lean();

//   let updatedCount = 0;

//   for (const user of users) {
//     const updateData: any = {};

//     // Default empty memberships
//     updateData.general_membership = {
//       membership: false,
//     };

//     updateData.academy_membership = {
//       membership: false,
//     };

//     // Detect membership type
//     if (
//       user.package_name === 'individual pro' ||
//       user.package_name === 'individual pro unlimited'
//     ) {
//       updateData.general_membership = {
//         membership: user.membership ?? false,
//         status: user.status,
//         issue_date: user.issue_date,
//         expiry_date: user.expiry_date,
//         package_name: user.package_name,
//         plan: user.plan,
//         credit_balance: user.credit_balance,
//         credit_date: user.credit_date,
//       };
//     }

//     if (user.package_name === 'youth training membership') {
//       updateData.academy_membership = {
//         membership: user.membership ?? false,
//         status: user.status,
//         issue_date: user.issue_date,
//         expiry_date: user.expiry_date,
//         package_name: user.package_name,
//         plan: user.plan,
//         credit_balance: {
//           session_credit: user.credit_balance?.session_credit,
//         },
//         credit_date: user.credit_date,
//       };
//     }

//     // Remove old flat membership fields
//     updateData.$unset = {
//       membership: '',
//       status: '',
//       issue_date: '',
//       expiry_date: '',
//       package_name: '',
//       plan: '',
//       credit_balance: '',
//       credit_date: '',
//     };

//     await User.updateOne(
//       { _id: user._id },
//       {
//         $set: updateData,
//         $unset: updateData.$unset,
//       },
//     );

//     updatedCount++;
//   }

//   console.log(`✅ Migration completed. Updated users: ${updatedCount}`);
// };

// Database connection

async function dbConnection() {
  const url = config.database_url;
  try {
    await mongoose.connect(url as string);
    startMembershipCronJob();
    startTempFacilityReservationCronJob();
    startProvideCreditForExistingUsersCron();
    startMonthlyCreditCron();
    // migrateUsersToNewMembershipSchema();
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
