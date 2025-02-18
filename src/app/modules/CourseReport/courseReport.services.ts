import { CourseReservation } from '../CoursesReservation/coursesReservation.model';

const getReservationRevenueByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string).split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await CourseReservation.aggregate([
    {
      $lookup: {
        from: 'bootcamppayments',
        localField: 'payment',
        foreignField: '_id',
        as: 'paymentInfo',
      },
    },
    { $unwind: '$paymentInfo' },

    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${nextYear}-${nextMonth}-01`),
        },
      },
    },

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
            0,
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
  const [year, month] = (date as string).split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await CourseReservation.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-${month}`),
          $lt: new Date(`${nextYear}-${nextMonth}`),
        },
      },
    },

    {
      $group: {
        _id: '$sport',
        count: { $sum: 1 },
      },
    },

    {
      $group: {
        _id: null,
        totalBookings: { $sum: '$count' },
        sports: { $push: { type: '$_id', count: '$count' } },
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
  const analytics = await CourseReservation.aggregate([
    {
      $lookup: {
        from: 'bootcamppayments', // Ensure this matches your payment collection name
        localField: 'payment',
        foreignField: '_id',
        as: 'paymentInfo',
      },
    },
    { $unwind: '$paymentInfo' },

    {
      $group: {
        _id: null,
        totalCourses: { $addToSet: '$course' }, // Unique courses
        totalEnrollments: { $sum: 1 }, // Count of enrollments
        totalRevenue: { $sum: '$paymentInfo.amount' }, // Sum of payments
      },
    },

    {
      $project: {
        _id: 0,
        analytics: [
          { title: 'Total Booked Bootcamp', value: { $size: '$totalCourses' } },
          { title: 'Total Enrollments', value: '$totalEnrollments' },
          { title: 'Revenue from Courses', value: '$totalRevenue' },
        ],
      },
    },
  ]);

  return analytics.length > 0 ? analytics[0].analytics : [];
};

export const CourseReportServices = {
  getReservationRevenueByMonthFromDB,
  getReservationTopSportsByMonthFromDB,
  getOverallBookingAnalyticsFromDB,
};
