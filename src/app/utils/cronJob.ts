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

// const provideMembershipCreditForExistingUsers = async () => {
//   try {
//     const users = await User.find({ membership: true });

//     for (const user of users) {
//       if (user.status === true && !user.credit_balance) {
//         if (user.package_name === 'individual pro') {
//           user.credit_balance = {
//             session_credit: '4',
//             machine_credit: '4',
//           };
//         } else if (user.package_name === 'individual pro unlimited') {
//           user.credit_balance = {
//             session_credit: 'unlimited',
//             machine_credit: 'unlimited',
//           };
//         }

//         user.credit_date = new Date();
//         await user.save();
//       }
//     }
//   } catch (error) {
//     console.error('Error providing membership credit:', error);
//   }
// };

const monthlyCredit = async () => {
  const today = new Date();

  const users = await User.find({ membership: true });

  for (const user of users) {
    /**
     * -------- GENERAL MEMBERSHIP --------
     */
    if (
      user.general_membership?.status &&
      user.general_membership.credit_date
    ) {
      const issueDate = new Date(user.general_membership.credit_date);
      const nextCreditDate = new Date(issueDate);
      nextCreditDate.setMonth(nextCreditDate.getMonth() + 1);

      if (today >= nextCreditDate) {
        const update: any = {
          'general_membership.credit_date': today,
        };

        if (user.general_membership.package_name === 'individual pro') {
          update['general_membership.credit_balance.session_credit'] = '4';
          update['general_membership.credit_balance.machine_credit'] = '4';
        }

        if (
          user.general_membership.package_name === 'individual pro unlimited'
        ) {
          update['general_membership.credit_balance.session_credit'] =
            'unlimited';
          update['general_membership.credit_balance.machine_credit'] =
            'unlimited';
        }

        await User.updateOne({ _id: user._id }, { $set: update });
        continue;
      }
    }

    /**
     * -------- ACADEMY MEMBERSHIP --------
     */
    if (
      user.academy_membership?.status &&
      user.academy_membership.credit_date
    ) {
      const issueDate = new Date(user.academy_membership.credit_date);
      const nextCreditDate = new Date(issueDate);
      nextCreditDate.setMonth(nextCreditDate.getMonth() + 1);

      if (today >= nextCreditDate) {
        const update: any = {
          'academy_membership.credit_date': today,
        };

        if (
          user.academy_membership.package_name === 'youth training membership'
        ) {
          update['academy_membership.credit_balance.session_credit'] = '4';
        }

        await User.updateOne({ _id: user._id }, { $set: update });
      }
    }
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

// const startProvideCreditForExistingUsersCron = () => {
//   new CronJob(
//     '0 0 * * *',
//     async () => {
//       await provideMembershipCreditForExistingUsers();
//     },
//     null,
//     true,
//     'UTC',
//   );
// };

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
  // startProvideCreditForExistingUsersCron,
  startMonthlyCreditCron,
};
