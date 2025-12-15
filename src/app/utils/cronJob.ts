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
const provideMembershipCreditForExistingUsers = async () => {
  try {
    const users = await User.find({ membership: true });

    for (const user of users) {
      if (user.status === true && !user.credit_balance) {
        if (user.package_name === 'individual pro') {
          user.credit_balance = {
            session_credit: '4',
            machine_credit: '4',
          };
        } else if (user.package_name === 'individual pro unlimited') {
          user.credit_balance = {
            session_credit: 'unlimited',
            machine_credit: 'unlimited',
          };
        }

        user.credit_date = new Date();
        await user.save();
      }
    }
  } catch (error) {
    console.error('Error providing membership credit:', error);
  }
};

const monthlyCredit = async () => {
  const users = await User.find({ membership: true });

  for (const user of users) {
    if (user?.status !== true) continue;
    if (!user.credit_date) continue;
    const issueDate = new Date(user.credit_date);
    const nextCreditDate = new Date(issueDate);
    nextCreditDate.setMonth(nextCreditDate.getMonth() + 1);
    nextCreditDate.setDate(nextCreditDate.getDate() + 1);

    const today = new Date();
    if (today < nextCreditDate) continue;

    if (user.package_name === 'individual pro') {
      user.credit_balance = {
        session_credit: '4',
        machine_credit: '4',
      };
    }

    if (user.package_name === 'individual pro unlimited') {
      user.credit_balance = {
        session_credit: 'unlimited',
        machine_credit: 'unlimited',
      };
    }

    if (user.package_name === 'youth training membership') {
      user.credit_balance = {
        session_credit: '4',
      };
    }

    user.credit_date = today;

    await user.save();
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

const startProvideCreditForExistingUsersCron = () => {
  new CronJob(
    '0 0 * * *',
    async () => {
      await provideMembershipCreditForExistingUsers();
    },
    null,
    true,
    'UTC',
  );
};

const startMonthlyCreditCron = () => {
  new CronJob(
    '0 0 * * *',
    async () => {
      await monthlyCredit();
    },
    null,
    true,
    'UTC',
  );
};

export {
  startMembershipCronJob,
  startTempFacilityReservationCronJob,
  startProvideCreditForExistingUsersCron,
  startMonthlyCreditCron,
};
