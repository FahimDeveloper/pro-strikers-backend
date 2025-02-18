import { AppointmentGroupReservation } from '../AppointmentGroupReservation/appointmentGroupReservation.model';

const getReservationFrequencyByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();

  const allDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: (i + 1).toString(),
    booking: 0,
  }));

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const bookings = await AppointmentGroupReservation.aggregate([
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: { $substr: ['$appointment_date', 0, 10] },
            format: '%Y-%m-%d',
          },
        },
      },
    },
    {
      $match: {
        bookingDate: {
          $gte: new Date(`${year}-${month}`),
          $lt: new Date(`${nextYear}-${nextMonth}`),
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: '$bookingDate' },
        booking: { $sum: 1 },
      },
    },
    {
      $project: {
        date: { $toString: '$_id' },
        booking: 1,
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);

  const result = allDays.map(
    day => bookings.find(b => b.date === day.date) || day,
  );
  return result;
};

const getReservationRevenueByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await AppointmentGroupReservation.aggregate([
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: { $substr: ['$appointment_date', 0, 10] },
            format: '%Y-%m-%d',
          },
        },
      },
    },
    {
      $match: {
        bookingDate: {
          $gte: new Date(`${year}-${month}`),
          $lt: new Date(`${nextYear}-${nextMonth}`),
        },
      },
    },
    {
      $lookup: {
        from: 'appointmentpayments',
        localField: 'payment',
        foreignField: '_id',
        as: 'paymentInfo',
      },
    },
    { $unwind: '$paymentInfo' },
    {
      $group: {
        _id: '$sport',
        totalRevenue: { $sum: '$paymentInfo.amount' },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenueAll: { $sum: '$totalRevenue' },
        sports: { $push: { type: '$_id', revenue: '$totalRevenue' } },
      },
    },
    { $unwind: '$sports' },
    {
      $project: {
        _id: 0,
        type: '$sports.type',
        value: {
          $round: [
            {
              $multiply: [
                { $divide: ['$sports.revenue', '$totalRevenueAll'] },
                100,
              ],
            },
            2,
          ],
        },
      },
    },
    { $sort: { value: -1 } },
  ]);

  return analytics;
};

const getReservationTopSportsByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await AppointmentGroupReservation.aggregate([
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: { $substr: ['$appointment_date', 0, 10] },
            format: '%Y-%m-%d',
          },
        },
      },
    },

    {
      $match: {
        bookingDate: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${nextYear}-${nextMonth}-01`),
        },
      },
    },

    {
      $group: {
        _id: '$sport',
        totalBookings: { $sum: 1 },
      },
    },

    {
      $group: {
        _id: null,
        totalBookingsAll: { $sum: '$totalBookings' },
        sports: { $push: { type: '$_id', bookingCount: '$totalBookings' } },
      },
    },

    { $unwind: '$sports' },

    {
      $project: {
        _id: 0,
        type: '$sports.type',
        value: {
          $round: [
            {
              $multiply: [
                { $divide: ['$sports.bookingCount', '$totalBookingsAll'] }, // Percentage of total bookings
                100,
              ],
            },
            0,
          ],
        },
      },
    },

    { $sort: { value: -1 } },
  ]);

  return analytics;
};

const getReservationTopTrainersByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await AppointmentGroupReservation.aggregate([
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: { $substr: ['$appointment_date', 0, 10] },
            format: '%Y-%m-%d',
          },
        },
      },
    },

    {
      $match: {
        bookingDate: {
          $gte: new Date(`${year}-${month}`),
          $lt: new Date(`${nextYear}-${nextMonth}`),
        },
      },
    },

    {
      $group: {
        _id: '$trainer',
        totalBookings: { $sum: 1 },
      },
    },

    {
      $lookup: {
        from: 'admins',
        localField: '_id',
        foreignField: '_id',
        as: 'trainerInfo',
      },
    },

    { $unwind: '$trainerInfo' },

    {
      $project: {
        _id: 0,
        type: {
          $concat: ['$trainerInfo.first_name', ' ', '$trainerInfo.last_name'],
        },
        value: 1,
      },
    },

    {
      $group: {
        _id: null,
        totalBookingsAll: { $sum: '$totalBookings' },
        trainers: { $push: { type: '$type', bookingCount: '$totalBookings' } },
      },
    },

    { $unwind: '$trainers' },

    {
      $project: {
        type: '$trainers.type',
        value: {
          $round: [
            {
              $multiply: [
                { $divide: ['$trainers.bookingCount', '$totalBookingsAll'] },
                100,
              ],
            },
            0,
          ],
        },
      },
    },

    { $sort: { value: -1 } },
  ]);

  return analytics;
};

const getOverallBookingAnalyticsFromDB = async () => {
  const analytics = await AppointmentGroupReservation.aggregate([
    {
      $lookup: {
        from: 'appointmentpayments',
        localField: 'payment',
        foreignField: '_id',
        as: 'paymentInfo',
      },
    },

    { $unwind: '$paymentInfo' },

    {
      $group: {
        _id: null,
        totalAppointments: { $sum: 1 },
        totalBookings: { $sum: '$booking_count' },
        totalRevenue: { $sum: '$paymentInfo.amount' },
      },
    },

    {
      $project: {
        _id: 0,
        totalAppointments: 1,
        totalBookings: 1,
        totalRevenue: 1,
      },
    },
  ]);

  const result = [
    {
      title: 'Total Appointments Booked',
      value: analytics[0]?.totalAppointments || 0,
    },
    {
      title: 'Total Bookings',
      value: analytics[0]?.totalBookings || 0,
    },
    {
      title: 'Revenue from Appointments',
      value: analytics[0]?.totalRevenue || 0,
    },
  ];

  return result;
};

export const AppointmentGroupReportServices = {
  getReservationFrequencyByMonthFromDB,
  getReservationRevenueByMonthFromDB,
  getReservationTopSportsByMonthFromDB,
  getOverallBookingAnalyticsFromDB,
  getReservationTopTrainersByMonthFromDB,
};
