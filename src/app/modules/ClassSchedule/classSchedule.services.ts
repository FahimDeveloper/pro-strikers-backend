import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { IClassSchedule } from './classSchedule.interface';
import { ClassSchedule } from './classSchedule.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

const createClassIntoDB = async (payload: IClassSchedule) => {
  const result = await ClassSchedule.create(payload);
  return result;
};

const updateClassIntoDB = async (
  id: string,
  payload: Partial<IClassSchedule>,
) => {
  const result = await ClassSchedule.findByIdAndUpdate(id, payload);
  return result;
};

const getAllClassesFromDB = async (query: Record<string, unknown>) => {
  const classQuery = new QueryBuilder(
    ClassSchedule.find().populate('trainer'),
    query,
  )
    .search(['class_name'])
    .filter()
    .paginate();
  const result = await classQuery?.modelQuery;
  const count = await classQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getSingleClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findById(id);
  return result;
};

const getClassByQueryDataFromDB = async (query: Record<string, unknown>) => {
  const queryDate = new Date(query.date as string);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = daysOfWeek[queryDate.getUTCDay()];

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

  const results = await ClassSchedule.aggregate([
    { $match: matchConditions },

    { $unwind: '$schedules' },

    {
      $match: {
        'schedules.day': dayOfWeek,
        'schedules.active': true,
      },
    },
    {
      $lookup: {
        from: 'classreservations',
        let: { classId: '$_id', classScheduleDay: dayOfWeek },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$class', '$$classId'] },
                  {
                    $gte: [
                      { $toDate: '$class_date' },
                      new Date(queryDate.setHours(0, 0, 0, 0)),
                    ],
                  },
                  {
                    $lt: [
                      { $toDate: '$class_date' },
                      new Date(queryDate.setHours(23, 59, 59, 999)),
                    ],
                  },
                ],
              },
            },
          },
          { $count: 'enrolledCount' },
        ],
        as: 'enrollmentData',
      },
    },

    {
      $addFields: {
        enrolled: {
          $ifNull: [{ $arrayElemAt: ['$enrollmentData.enrolledCount', 0] }, 0],
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
        class_name: 1,
        sport: 1,
        price: 1,
        description: 1,
        enrolled: 1,
        schedules: 1,
        capacity: 1,
        trainer: {
          _id: '$trainer._id',
          first_name: '$trainer.first_name',
          last_name: '$trainer.last_name',
        },
      },
    },
  ]);

  return results;
};

const getClassByIdDateFromDB = async ({
  id,
  date,
}: {
  id: string;
  date: Date;
}) => {
  const queryDate = new Date(date);
  if (queryDate.getDate() < new Date().getDate()) {
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
    const result = await ClassSchedule.findOne({
      _id: new mongoose.Types.ObjectId(id),
      schedules: {
        $elemMatch: {
          day: dayOfWeek,
          active: true,
        },
      },
    }).populate([
      {
        path: 'trainer',
        select: 'first_name last_name',
      },
    ]);
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Class not found, Please check ID and date is available or not',
      );
    }
    return result;
  }
};

const deleteClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findByIdAndDelete(id);
  return result;
};

export const ClassScheduleServices = {
  createClassIntoDB,
  updateClassIntoDB,
  getAllClassesFromDB,
  getSingleClassFromDB,
  getClassByQueryDataFromDB,
  deleteClassFromDB,
  getClassByIdDateFromDB,
};
