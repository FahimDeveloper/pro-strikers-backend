import { CronJob } from 'cron';
import { User } from '../modules/User/user.model';
import { FacilityReservation } from '../modules/FacilityReservation/facilityReservation.model';

// Function to check and update expired memberships
const checkMembershipStatus = async () => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const usersToUpdate = await User.find({
      membership: true,
      expiry_date: { $lt: currentDate },
    });

    if (usersToUpdate.length > 0) {
      await User.updateMany(
        { _id: { $in: usersToUpdate.map(user => user._id) } },
        { $set: { status: false } },
      );
    }
  } catch (error) {
    console.error('Error checking membership status:', error);
  }
};

const checkFacilityTempReservations = async () => {
  try {
    const currentTime = new Date();
    const THIRTY_MINUTES = 30 * 60 * 1000; // 30 minutes in milliseconds

    const reservations = await FacilityReservation.find({ confirmed: false });

    for (const reservation of reservations) {
      const createdAt = new Date(reservation.createdAt); // Convert to Date object
      const expiryTime = new Date(createdAt.getTime() + THIRTY_MINUTES);

      if (currentTime.getTime() > expiryTime.getTime()) {
        await FacilityReservation.findByIdAndDelete(reservation._id);
        console.log(`Deleted expired reservation: ${reservation._id}`);
      }
    }

    console.log('Cron job execution completed.');
  } catch (error) {
    console.error('Error in deleting expired reservations:', error);
  }
};

const startMembershipCronJob = () => {
  new CronJob(
    '0 0 * * *',
    async () => {
      await checkMembershipStatus();
    },
    null,
    true,
    'UTC',
  );
};

const startTempFacilityReservationCronJob = () => {
  new CronJob(
    '*/5 * * * *',
    async () => {
      await checkFacilityTempReservations();
    },
    null,
    true,
    'UTC',
  );
};

export { startMembershipCronJob, startTempFacilityReservationCronJob };
