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
    const reservations = await FacilityReservation.find({ confirmed: false });

    for (const reservation of reservations) {
      const { createdAt, temp_duration } = reservation;

      if (!createdAt || !temp_duration) continue; // Skip if missing data

      // Convert temp_duration (e.g., "30m", "1h") into milliseconds
      let durationMs = 0;
      if (temp_duration.includes('m')) {
        durationMs = parseInt(temp_duration) * 60 * 1000; // Convert minutes to milliseconds
      } else if (temp_duration.includes('h')) {
        durationMs = parseInt(temp_duration) * 60 * 60 * 1000; // Convert hours to milliseconds
      }

      // Check if the reservation has expired
      const expiryTime = new Date(createdAt.getTime() + durationMs);
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
    '*/15 * * * *',
    async () => {
      await checkFacilityTempReservations();
    },
    null,
    true,
    'UTC',
  );
};

export { startMembershipCronJob, startTempFacilityReservationCronJob };
