import { FacilityReservation } from '../FacilityReservation/facilityReservation.model';

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

  const bookings = await FacilityReservation.aggregate([
    { $unwind: '$bookings' },
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: '$bookings.date',
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

  const analytics = await FacilityReservation.aggregate([
    { $unwind: '$bookings' }, // Unwind bookings to process each separately
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: '$bookings.date',
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
        from: 'facilitypayments',
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
            0,
          ],
        },
      },
    },
    { $sort: { value: -1 } },
  ]);

  return analytics;
};

const getReservationLaneUtilizationByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await FacilityReservation.aggregate([
    { $unwind: '$bookings' },

    // Convert 'bookings.date' (string) to actual Date object
    {
      $addFields: {
        bookingDate: {
          $dateFromString: {
            dateString: '$bookings.date',
            format: '%Y-%m-%d',
          },
        },
      },
    },

    // Match only bookings within the given month
    {
      $match: {
        bookingDate: {
          $gte: new Date(`${year}-${month}`),
          $lt: new Date(`${nextYear}-${nextMonth}`),
        },
      },
    },

    // Count total bookings for the given month
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
      },
    },

    {
      $lookup: {
        from: 'facilityreservations', // Self-join to get lane-wise counts
        pipeline: [
          { $unwind: '$bookings' },
          {
            $addFields: {
              bookingDate: {
                $dateFromString: {
                  dateString: '$bookings.date',
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
        ],
        as: 'allBookings',
      },
    },

    { $unwind: '$allBookings' }, // Flatten again

    // Group by lane and count
    {
      $group: {
        _id: '$allBookings.bookings.lane',
        count: { $sum: 1 },
        totalBookings: { $first: '$totalBookings' }, // Keep total bookings
      },
    },

    // Calculate percentage
    {
      $project: {
        _id: 0,
        type: '$_id',
        value: {
          $floor: {
            // Rounds down to the nearest integer
            $multiply: [{ $divide: ['$count', '$totalBookings'] }, 100],
          },
        },
      },
    },

    { $sort: { value: -1 } }, // Sort by highest utilization
  ]);

  return analytics;
};

const getOverallBookingAnalyticsFromDB = async () => {
  const analytics = await FacilityReservation.aggregate([
    {
      $lookup: {
        from: 'facilitypayments',
        localField: 'payment',
        foreignField: '_id',
        as: 'paymentInfo',
      },
    },
    { $unwind: '$paymentInfo' },
    {
      $group: {
        _id: null,
        total_booking: { $sum: 1 },
        total_revenue: { $sum: '$paymentInfo.amount' },
        first_booking_date: { $min: '$createdAt' },
        last_booking_date: { $max: '$createdAt' },
      },
    },
    {
      $addFields: {
        total_days: {
          $dateDiff: {
            startDate: '$first_booking_date',
            endDate: '$last_booking_date',
            unit: 'day',
          },
        },
      },
    },
    {
      $addFields: {
        avg_booking: {
          $cond: {
            if: { $gt: ['$total_days', 0] },
            then: {
              $toInt: {
                $round: [{ $divide: ['$total_booking', '$total_days'] }, 0],
              },
            },
            else: '$total_booking',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total_booking: 1,
        avg_booking: 1,
        total_revenue: 1,
      },
    },
  ]);

  const result = analytics[0] || {
    total_booking: 0,
    avg_booking: 0,
    total_revenue: 0,
  };

  return [
    { title: 'Total Facility Bookings', value: result.total_booking },
    { title: 'Average Daily Bookings', value: result.avg_booking },
    { title: 'Revenue from Facility Rentals', value: result.total_revenue },
  ];
};

export const FacilityReportServices = {
  getReservationFrequencyByMonthFromDB,
  getReservationRevenueByMonthFromDB,
  getReservationLaneUtilizationByMonthFromDB,
  getOverallBookingAnalyticsFromDB,
};
