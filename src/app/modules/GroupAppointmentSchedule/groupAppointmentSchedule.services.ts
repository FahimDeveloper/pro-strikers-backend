import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IGroupAppointmentSchedule } from './groupAppointmentSchedule.interface';
import { GroupAppointmentSchedule } from './groupAppointmentSchedule.model';
import mongoose from 'mongoose';

const createAppointmentIntoDB = async (payload: IGroupAppointmentSchedule) => {
  const result = await GroupAppointmentSchedule.create(payload);
  return result;
};

const updateAppointmentIntoDB = async (
  id: string,
  payload: Partial<IGroupAppointmentSchedule>,
) => {
  const result = await GroupAppointmentSchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllAppointmentsFromDB = async (query: Record<string, unknown>) => {
  const appointmentQuery = new QueryBuilder(
    GroupAppointmentSchedule.find().populate([
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]),
    query,
  )
    .search(['appointment_name'])
    .filter()
    .paginate();
  const result = await appointmentQuery?.modelQuery;
  const count = await appointmentQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getAppointmentsByQueryDateFromDB = async (
  query: Record<string, unknown>,
) => {
  const queryDate = new Date(query.date as string);

  if (queryDate < new Date()) {
    return [];
  } else {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayOfWeek = daysOfWeek[queryDate.getDay()];

    const matchConditions: Record<string, any> = {
      sport: query.sport,
      schedules: {
        $elemMatch: {
          day: dayOfWeek,
          active: true,
        },
      },
    };

    if (query.trainer) {
      matchConditions.trainer = new mongoose.Types.ObjectId(
        query.trainer as string,
      );
    }

    const results = await GroupAppointmentSchedule.aggregate([
      {
        $match: matchConditions,
      },
      {
        $unwind: '$schedules',
      },
      {
        $match: {
          'schedules.day': dayOfWeek,
          'schedules.active': true,
        },
      },
      {
        $lookup: {
          from: 'appointmentgroupreservations',
          let: { appointmentId: '$_id', reservationDate: query.date },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$appointment', '$$appointmentId'] },
                    {
                      $gte: [
                        '$date',
                        new Date(queryDate.setUTCHours(0, 0, 0, 0)),
                      ],
                    },
                    {
                      $lt: [
                        '$date',
                        new Date(queryDate.setUTCHours(23, 59, 59, 999)),
                      ],
                    },
                  ],
                },
              },
            },
            {
              $count: 'enrolledCount',
            },
          ],
          as: 'enrollmentData',
        },
      },
      {
        $addFields: {
          enrolled: {
            $ifNull: [
              { $arrayElemAt: ['$enrollmentData.enrolledCount', 0] },
              0,
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer',
        },
      },
      {
        $unwind: {
          path: '$trainer',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          appointment_name: 1,
          sport: 1,
          price: 1,
          description: 1,
          enrolled: 1,
          schedules: 1,
          createdAt: 1,
          updatedAt: 1,
          capacity: 1,
          trainer: {
            _id: '$trainer._id',
            first_name: '$trainer.first_name',
            last_name: '$trainer.last_name',
          },
        },
      },
    ]).exec();

    return results;
  }
};

const getAppointmentByIdDateFromDB = async ({
  id,
  date,
}: {
  id: string;
  date: Date;
}) => {
  const queryDate = new Date(date);

  if (queryDate < new Date()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Date cannot be less than current date',
    );
  } else {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayOfWeek = daysOfWeek[queryDate.getDay()];
    const result = await GroupAppointmentSchedule.findOne({
      _id: new mongoose.Types.ObjectId(id),
      schedules: {
        $elemMatch: {
          day: dayOfWeek,
          active: true,
        },
      },
    });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Appointment not found, Please check ID and date is available or not',
      );
    }
    return result;
  }
};

const getSingleAppointmentFromDB = async (id: string) => {
  const result = await GroupAppointmentSchedule.findById(id);
  return result;
};

const getAppointmentByIdFromDB = async (id: string) => {
  const result = await GroupAppointmentSchedule.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Could not find the appointment',
    );
  }
  return result;
};

const deleteAppointmentFromDB = async (id: string) => {
  const result = await GroupAppointmentSchedule.findByIdAndDelete(id);
  return result;
};

export const GroupAppointmentScheduleServices = {
  createAppointmentIntoDB,
  updateAppointmentIntoDB,
  getAllAppointmentsFromDB,
  getSingleAppointmentFromDB,
  deleteAppointmentFromDB,
  getAppointmentByIdFromDB,
  getAppointmentsByQueryDateFromDB,
  getAppointmentByIdDateFromDB,
};
