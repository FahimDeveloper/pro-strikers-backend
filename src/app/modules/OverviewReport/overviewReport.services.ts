import mongoose from 'mongoose';
import { ClassSchedule } from '../ClassSchedule/classSchedule.model';
import { CourseSchedule } from '../CourseSchedule/courseSchedule.model';
import { GroupAppointmentSchedule } from '../GroupAppointmentSchedule/groupAppointmentSchedule.model';
import { OneAppointmentSchedule } from '../OneAppointmentSchedule/oneAppointmentSchedule.model';

const trainerOverviewFromDB = async (query: Record<string, unknown>) => {
  try {
    const { trainer, date } = query;
    const [year, month] = (date as string).split('/').map(Number);
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0));
    const daysInMonth = endDate.getUTCDate();

    // Generate dates and day names for the month
    const datesInMonth = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(Date.UTC(year, month - 1, i + 1));
      return {
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      };
    });

    // Aggregation for CourseSchedule
    const courses = await CourseSchedule.aggregate([
      {
        $match: {
          trainer: new mongoose.Types.ObjectId(trainer as string),
          $expr: {
            $and: [
              { $lte: [{ $toDate: '$start_date' }, startDate] },
              { $gte: [{ $toDate: '$end_date' }, endDate] },
            ],
          },
        },
      },
      {
        $project: {
          course_name: 1,
          start_date: 1,
          end_date: 1,
          start_time: 1,
          end_time: 1,
        },
      },
    ]);
    // Aggregation for GroupAppointmentSchedule
    const groupAppointments = await GroupAppointmentSchedule.aggregate([
      {
        $match: {
          trainer: new mongoose.Types.ObjectId(trainer as string),
        },
      },
      {
        $unwind: '$schedules',
      },
      {
        $match: {
          'schedules.active': true,
        },
      },
      {
        $project: {
          appointment_name: 1,
          'schedules.day': 1,
          'schedules.start_time': 1,
          'schedules.end_time': 1,
        },
      },
    ]);

    // Aggregation for OneAppointmentSchedule
    const oneOnOneAppointments = await OneAppointmentSchedule.aggregate([
      {
        $match: {
          trainer: new mongoose.Types.ObjectId(trainer as string),
        },
      },
      {
        $unwind: '$schedules',
      },
      {
        $match: {
          'schedules.active': true,
        },
      },
      {
        $project: {
          appointment_name: 1,
          'schedules.day': 1,
          'schedules.start_time': 1,
          'schedules.end_time': 1,
        },
      },
    ]);

    // Aggregation for ClassSchedule
    const classes = await ClassSchedule.aggregate([
      {
        $match: {
          trainer: new mongoose.Types.ObjectId(trainer as string),
        },
      },
      {
        $unwind: '$schedules',
      },
      {
        $match: {
          'schedules.active': true,
        },
      },
      {
        $project: {
          class_name: 1,
          'schedules.day': 1,
          'schedules.start_time': 1,
          'schedules.end_time': 1,
        },
      },
    ]);

    // Build the response array
    const response = datesInMonth.map(({ date, dayName }) => {
      const training: any = [];

      // Add courses for the day
      courses.forEach(course => {
        const courseStartDate = new Date(course.start_date);
        const courseEndDate = new Date(course.end_date);
        if (
          new Date(date) >= courseStartDate &&
          new Date(date) <= courseEndDate
        ) {
          training.push({
            name: course.course_name,
            start_time: course.start_time,
            end_time: course.end_time,
          });
        }
      });

      // Add group appointments for the day
      groupAppointments.forEach(appointment => {
        if (appointment.schedules.day === dayName) {
          training.push({
            name: appointment.appointment_name,
            start_time: appointment.schedules.start_time,
            end_time: appointment.schedules.end_time,
          });
        }
      });

      // Add one-on-one appointments for the day
      oneOnOneAppointments.forEach(appointment => {
        if (appointment.schedules.day === dayName) {
          training.push({
            name: appointment.appointment_name,
            start_time: appointment.schedules.start_time,
            end_time: appointment.schedules.end_time,
          });
        }
      });

      // Add classes for the day
      classes.forEach(classReservation => {
        if (classReservation.schedules.day === dayName) {
          training.push({
            name: classReservation.class_name,
            start_time: classReservation.schedules.start_time,
            end_time: classReservation.schedules.end_time,
          });
        }
      });

      return {
        date,
        day: dayName,
        training,
      };
    });

    return response;
  } catch (error) {
    console.error('Error fetching trainer schedule:', error);
    throw error;
  }
};

const adminOverviewFromDB = async (query: Record<string, unknown>) => {
  try {
    const { date } = query;
    const [year, month] = (date as string).split('/').map(Number);
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0));
    const daysInMonth = endDate.getUTCDate();

    // Generate dates and day names for the month
    const datesInMonth = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(Date.UTC(year, month - 1, i + 1));
      return {
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      };
    });

    // Aggregation for CourseSchedule with trainer population
    const courses = await CourseSchedule.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $lte: [{ $toDate: '$start_date' }, startDate] },
              { $gte: [{ $toDate: '$end_date' }, endDate] },
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
      { $unwind: '$trainer' },
      {
        $project: {
          course_name: 1,
          start_date: 1,
          end_date: 1,
          start_time: 1,
          end_time: 1,
          trainer: { first_name: 1, last_name: 1 },
        },
      },
    ]);

    // Aggregation for GroupAppointmentSchedule with trainer population
    const groupAppointments = await GroupAppointmentSchedule.aggregate([
      { $unwind: '$schedules' },
      { $match: { 'schedules.active': true } },
      {
        $lookup: {
          from: 'admins',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer',
        },
      },
      { $unwind: '$trainer' },
      {
        $project: {
          appointment_name: 1,
          'schedules.day': 1,
          'schedules.start_time': 1,
          'schedules.end_time': 1,
          trainer: { first_name: 1, last_name: 1 },
        },
      },
    ]);

    // Aggregation for OneAppointmentSchedule with trainer population
    const oneOnOneAppointments = await OneAppointmentSchedule.aggregate([
      { $unwind: '$schedules' },
      { $match: { 'schedules.active': true } },
      {
        $lookup: {
          from: 'admins',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer',
        },
      },
      { $unwind: '$trainer' },
      {
        $project: {
          appointment_name: 1,
          'schedules.day': 1,
          'schedules.start_time': 1,
          'schedules.end_time': 1,
          trainer: { first_name: 1, last_name: 1 },
        },
      },
    ]);

    // Aggregation for ClassSchedule with trainer population
    const classes = await ClassSchedule.aggregate([
      { $unwind: '$schedules' },
      { $match: { 'schedules.active': true } },
      {
        $lookup: {
          from: 'admins',
          localField: 'trainer',
          foreignField: '_id',
          as: 'trainer',
        },
      },
      { $unwind: '$trainer' },
      {
        $project: {
          class_name: 1,
          'schedules.day': 1,
          'schedules.start_time': 1,
          'schedules.end_time': 1,
          trainer: { first_name: 1, last_name: 1 },
        },
      },
    ]);

    // Build the response array
    const response = datesInMonth.map(({ date, dayName }) => {
      const training: any = [];

      // Add courses for the day
      courses.forEach(course => {
        const courseStartDate = new Date(course.start_date);
        const courseEndDate = new Date(course.end_date);
        if (
          new Date(date) >= courseStartDate &&
          new Date(date) <= courseEndDate
        ) {
          training.push({
            name: course.course_name,
            start_time: course.start_time,
            end_time: course.end_time,
            trainer: course.trainer,
          });
        }
      });

      // Add group appointments for the day
      groupAppointments.forEach(appointment => {
        if (appointment.schedules.day === dayName) {
          training.push({
            name: appointment.appointment_name,
            start_time: appointment.schedules.start_time,
            end_time: appointment.schedules.end_time,
            trainer: appointment.trainer,
          });
        }
      });

      // Add one-on-one appointments for the day
      oneOnOneAppointments.forEach(appointment => {
        if (appointment.schedules.day === dayName) {
          training.push({
            name: appointment.appointment_name,
            start_time: appointment.schedules.start_time,
            end_time: appointment.schedules.end_time,
            trainer: appointment.trainer,
          });
        }
      });

      // Add classes for the day
      classes.forEach(classReservation => {
        if (classReservation.schedules.day === dayName) {
          training.push({
            name: classReservation.class_name,
            start_time: classReservation.schedules.start_time,
            end_time: classReservation.schedules.end_time,
            trainer: classReservation.trainer,
          });
        }
      });

      return {
        date,
        day: dayName,
        training,
      };
    });

    return response;
  } catch (error) {
    console.error('Error fetching trainer schedule:', error);
    throw error;
  }
};

export const OverviewReportService = {
  trainerOverviewFromDB,
  adminOverviewFromDB,
};
