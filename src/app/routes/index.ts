import express from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { UserRoutes } from '../modules/User/user.route';
import { ClassRoutes } from '../modules/ClassSchedule/classSchedule.route';
import { CourseRoutes } from '../modules/CourseSchedule/courseSchedule.route';
import { AppointmentRoutes } from '../modules/AppointmentSchedule/appointmentSchedule.route';
import { FacilityRoutes } from '../modules/FacilitySchedule/facilitySchedule.route';
import { VoucherRoute } from '../modules/Voucher/voucher.route';
import { PostRoutes } from '../modules/Post/post.route';
import { EventRoutes } from '../modules/Events/events.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = express.Router();

const mainRoutes = [
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/schedule/classes',
    route: ClassRoutes,
  },
  {
    path: '/schedule/courses',
    route: CourseRoutes,
  },
  {
    path: '/schedule/appointments',
    route: AppointmentRoutes,
  },
  {
    path: '/schedule/facilities',
    route: FacilityRoutes,
  },
  {
    path: '/vouchers',
    route: VoucherRoute,
  },
  {
    path: '/events',
    route: EventRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
];

mainRoutes.forEach(route => router.use(route.path, route.route));

export default router;
