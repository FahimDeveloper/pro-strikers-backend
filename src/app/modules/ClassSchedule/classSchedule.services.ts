import QueryBuilder from '../../builder/QueryBuilder';
import { IClassSchedule } from './classSchedule.interface';
import { ClassSchedule } from './classSchedule.model';
import mongoose from 'mongoose';

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

const getClassByDateFromDB = async (query: Record<string, unknown>) => {
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
        from: 'classesreservations',
        let: { classId: '$_id', reservationDate: query.date },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$class', '$$classId'] },
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
};

// const getClassByDateFromDB = async (payload: any) => {
//   const result = await ClassSchedule.findById(payload.id).select(
//     'sport schedules trainer',
//   );
//   if (!result) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Class not found');
//   }
//   const day = moment(payload.date).format('dddd');
//   if (result) {
//     let schedule;
//     schedule = result?.schedules.find(
//       (schedule: IClassDaySchedule) => schedule.day === day,
//     );
//     if (!schedule?.active) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'Class not available in your selected date',
//       );
//     }
//     result.schedules = [schedule];
//     return result;
//   }
// };

const deleteClassFromDB = async (id: string) => {
  const result = await ClassSchedule.findByIdAndDelete(id);
  return result;
};

export const ClassScheduleServices = {
  createClassIntoDB,
  updateClassIntoDB,
  getAllClassesFromDB,
  getSingleClassFromDB,
  getClassByDateFromDB,
  deleteClassFromDB,
};
