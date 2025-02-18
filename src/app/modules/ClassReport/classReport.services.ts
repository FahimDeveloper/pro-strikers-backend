import { ClassReservation } from '../ClassReservation/classReservation.model';

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

  const bookings = await ClassReservation.aggregate([
    { $unwind: '$class_date' },
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: {
              $substr: ['$class_date', 0, 10],
            },
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

  const result = allDays.map(day => {
    const found = bookings.find(b => b.date === day.date);
    return found ? found : day;
  });

  return result;
};

const getReservationRevenueByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await ClassReservation.aggregate([
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: { $substr: ['$class_date', 0, 10] },
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
      $lookup: {
        from: 'classpayments',
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
                { $divide: ['$sports.revenue', '$totalRevenueAll'] }, // Percentage of total revenue
                100,
              ],
            },
            0,
          ],
        },
      },
    },

    { $sort: { value: -1 } }, // Sort by highest revenue percentage
  ]);

  return analytics;
};

const getReservationTopSportsByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  const analytics = await ClassReservation.aggregate([
    {
      $match: {
        class_date: {
          $gte: startOfMonth.toISOString(),
          $lt: endOfMonth.toISOString(),
        },
      },
    },
    {
      $group: {
        _id: '$sport',
        bookingCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: '$bookingCount' },
        sports: { $push: { type: '$_id', count: '$bookingCount' } },
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
                { $divide: ['$sports.count', '$totalBookings'] },
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
  const analytics = await ClassReservation.aggregate([
    {
      $lookup: {
        from: 'classpayments',
        localField: 'payment',
        foreignField: '_id',
        as: 'paymentInfo',
      },
    },

    { $unwind: '$paymentInfo' },

    {
      $group: {
        _id: null,
        totalClasses: { $addToSet: '$class' },
        totalBookings: { $sum: 1 },
        totalRevenue: { $sum: '$paymentInfo.amount' },
      },
    },

    {
      $project: {
        _id: 0,
        totalClasses: { $size: '$totalClasses' },
        totalBookings: 1,
        totalRevenue: 1,
      },
    },
  ]);

  const result = analytics[0] || {
    totalClasses: 0,
    totalBookings: 0,
    totalRevenue: 0,
  };

  return [
    { title: 'Total Booked Classes', value: result.totalClasses },
    { title: 'Total Bookings', value: result.totalBookings },
    { title: 'Revenue from Classes', value: result.totalRevenue },
  ];
};

export const ClassReportServices = {
  getReservationFrequencyByMonthFromDB,
  getReservationRevenueByMonthFromDB,
  getReservationTopSportsByMonthFromDB,
  getOverallBookingAnalyticsFromDB,
};
