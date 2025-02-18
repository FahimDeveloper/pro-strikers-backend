import { CronJob } from 'cron';
import { User } from '../modules/User/user.model';

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

export { startMembershipCronJob };
