import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TrackStudentModel } from './trackStudent.modal';
import moment from 'moment-timezone';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacilityReservation } from '../FacilityReservation/facilityReservation.model';
import { isNowWithinTimeSlot, TIMEZONE } from '../../utils/timeChecker';

// const attendanceIntoDB = async (payload: { email: string; phone: string }) => {
//   const { email, phone } = payload;

//   if (!email && !phone) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Email or phone is required.');
//   }

//   const phoneVariants =
//     phone && !phone.startsWith('+1')
//       ? [phone, `+1${phone}`]
//       : phone
//         ? [phone, phone.replace(/^\+1/, '')]
//         : [];

//   const user = await User.findOne({
//     $or: [
//       ...(email ? [{ email }] : []),
//       ...(phoneVariants.length ? [{ phone: { $in: phoneVariants } }] : []),
//     ],
//   });

//   if (!user) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
//   }

//   const startOfDay = moment().tz('America/Los_Angeles').startOf('day').toDate();
//   const endOfDay = moment().tz('America/Los_Angeles').endOf('day').toDate();

//   const lastRecord = await TrackStudentModel.findOne({
//     $or: [
//       ...(email ? [{ email }] : []),
//       ...(phoneVariants.length ? [{ phone: { $in: phoneVariants } }] : []),
//     ],
//     attendance_date: { $gte: startOfDay, $lte: endOfDay },
//   }).sort({ createdAt: -1 });

//   const now = moment().tz('America/Los_Angeles').toDate();

//   if (!lastRecord || lastRecord.check_out_time) {
//     const newCheckIn = await TrackStudentModel.create({
//       email: user.email,
//       phone: user.phone,
//       attendance_date: now,
//       check_in_time: now,
//     });

//     return {
//       message: 'Checked in successfully.',
//       action: 'checkin',
//       data: {
//         email: user.email,
//         phone: user.phone,
//         check_in_time: moment(newCheckIn.check_in_time)
//           .tz('America/Los_Angeles')
//           .format('hh:mm A'),
//         'America/Los_Angeles': 'America/Los_Angeles',
//       },
//     };
//   }

//   lastRecord.check_out_time = now;
//   await lastRecord.save();

//   const durationMs =
//     new Date(lastRecord.check_out_time).getTime() -
//     new Date(lastRecord.check_in_time!).getTime();
//   const durationMinutes = Math.round(durationMs / (1000 * 60));

//   const formattedCheckIn = moment(lastRecord.check_in_time)
//     .tz('America/Los_Angeles')
//     .format('hh:mm A');
//   const formattedCheckOut = moment(lastRecord.check_out_time)
//     .tz('America/Los_Angeles')
//     .format('hh:mm A');

//   return {
//     message: 'Checked out successfully.',
//     action: 'checkout',
//     data: {
//       email: user.email,
//       phone: user.phone,
//       check_in_time: formattedCheckIn,
//       check_out_time: formattedCheckOut,
//       duration: `${durationMinutes} minutes`,
//       'America/Los_Angeles': 'America/Los_Angeles',
//     },
//   };
// };

const attendanceIntoDB = async (payload: {
  email?: string;
  phone?: string;
}) => {
  const { email, phone } = payload;

  if (!email && !phone) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email or phone is required.');
  }

  const phoneVariants =
    phone && !phone.startsWith('+1')
      ? [phone, `+1${phone}`]
      : phone
        ? [phone, phone.replace(/^\+1/, '')]
        : [];

  const user = await User.findOne({
    $or: [
      ...(email ? [{ email }] : []),
      ...(phoneVariants.length ? [{ phone: { $in: phoneVariants } }] : []),
    ],
  });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const startOfDay = moment().tz(TIMEZONE).startOf('day').toDate();
  const endOfDay = moment().tz(TIMEZONE).endOf('day').toDate();
  const now = moment().tz(TIMEZONE).toDate();
  const today = moment().tz(TIMEZONE).format('YYYY-MM-DD');

  const lastRecord = await TrackStudentModel.findOne({
    $or: [
      ...(email ? [{ email }] : []),
      ...(phoneVariants.length ? [{ phone: { $in: phoneVariants } }] : []),
    ],
    attendance_date: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ createdAt: -1 });

  if (!lastRecord || lastRecord.check_out_time) {
    const reservation = await FacilityReservation.findOne({
      user: user._id,
      confirmed: true,
      bookings: { $elemMatch: { date: today } },
    });

    if (!reservation) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You have no reservation today.',
      );
    }

    const hasValidSlot = reservation.bookings.some(booking =>
      isNowWithinTimeSlot(booking.date, booking.time_slot),
    );

    if (!hasValidSlot) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You have no reservation at this time.',
      );
    }

    const newCheckIn = await TrackStudentModel.create({
      email: user.email,
      phone: user.phone,
      attendance_date: now,
      check_in_time: now,
    });

    return {
      message: 'Checked in successfully.',
      action: 'checkin',
      data: {
        email: user.email,
        phone: user.phone,
        check_in_time: moment(newCheckIn.check_in_time)
          .tz(TIMEZONE)
          .format('hh:mm A'),
      },
    };
  }

  lastRecord.check_out_time = now;
  await lastRecord.save();

  const durationMs =
    new Date(lastRecord.check_out_time).getTime() -
    new Date(lastRecord.check_in_time!).getTime();

  const durationMinutes = Math.round(durationMs / (1000 * 60));

  return {
    message: 'Checked out successfully.',
    action: 'checkout',
    data: {
      email: user.email,
      phone: user.phone,
      check_in_time: moment(lastRecord.check_in_time)
        .tz(TIMEZONE)
        .format('hh:mm A'),
      check_out_time: moment(lastRecord.check_out_time)
        .tz(TIMEZONE)
        .format('hh:mm A'),
      duration: `${durationMinutes} minutes`,
    },
  };
};

const getUserAllAttendanceFromDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const attendanceQuery = new QueryBuilder(
    TrackStudentModel.find({ email: email }),
    query,
  )
    .filter()
    .paginate();
  const result = await attendanceQuery?.modelQuery;
  const count = await attendanceQuery?.countTotal();
  return {
    count,
    result,
  };
};

export const TrackStudentServices = {
  attendanceIntoDB,
  getUserAllAttendanceFromDB,
};
