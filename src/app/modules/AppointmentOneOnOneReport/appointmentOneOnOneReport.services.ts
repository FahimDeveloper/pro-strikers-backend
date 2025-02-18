import { AppointmentOneOnOneReservation } from '../AppointmentOneOnOneReservation/appointmentOneOnOneReservation.model';

const getReservationFrequencyByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const daysInMonth = new Date(year, month, 0).getDate();
  const allDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: (i + 1).toString(),
    booking: 0,
  }));

  const bookings = await AppointmentOneOnOneReservation.aggregate([
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
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${nextYear}-${nextMonth}-01`),
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

  return allDays.map(day => {
    const found = bookings.find(b => b.date === day.date);
    return found ? found : day;
  });
};

const getReservationRevenueByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const analytics = await AppointmentOneOnOneReservation.aggregate([
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
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const sportsRevenue = await AppointmentOneOnOneReservation.aggregate([
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
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${nextYear}-${nextMonth}-01`),
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
            0,
          ],
        },
      },
    },
    { $sort: { value: -1 } },
  ]);

  return sportsRevenue;
};

const getOverallBookingAnalyticsFromDB = async () => {
  const analytics = await AppointmentOneOnOneReservation.aggregate([
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
        totalBookings: { $sum: { $size: '$bookings' } },
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

  return [
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
};

const getReservationTopTrainersByMonthFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date } = query;
  const [year, month] = (date as string)?.split('/').map(Number);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const trainersBookings = await AppointmentOneOnOneReservation.aggregate([
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
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${nextYear}-${nextMonth}-01`),
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
        trainer: {
          $concat: ['$trainerInfo.first_name', ' ', '$trainerInfo.last_name'],
        },
        totalBookings: 1,
      },
    },
    { $sort: { totalBookings: -1 } },
    { $limit: 5 },
  ]);

  const totalBookings = trainersBookings.reduce(
    (acc, trainer) => acc + trainer.totalBookings,
    0,
  );

  return trainersBookings.map(trainer => ({
    type: trainer.trainer,
    value: Math.round((trainer.totalBookings / totalBookings) * 100),
  }));
};

export const AppointmentOneOnOneReportServices = {
  getReservationFrequencyByMonthFromDB,
  getReservationRevenueByMonthFromDB,
  getReservationTopSportsByMonthFromDB,
  getOverallBookingAnalyticsFromDB,
  getReservationTopTrainersByMonthFromDB,
};
