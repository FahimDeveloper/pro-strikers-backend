import express from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { UserRoutes } from '../modules/User/user.route';
import { ClassRoutes } from '../modules/ClassSchedule/classSchedule.route';
import { CourseRoutes } from '../modules/CourseSchedule/courseSchedule.route';
import { AppointmentRoutes } from '../modules/AppointmentSchedule/appointmentSchedule.route';
import { FacilityRoutes } from '../modules/FacilitySchedule/facilitySchedule.route';
import { VoucherRoute } from '../modules/Voucher/voucher.route';

const router = express.Router();

const mainRoutes = [
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/classes',
    route: ClassRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/appointments',
    route: AppointmentRoutes,
  },
  {
    path: '/facilities',
    route: FacilityRoutes,
  },
  {
    path: '/vouchers',
    route: VoucherRoute,
  },
];

mainRoutes.forEach(route => router.use(route.path, route.route));

export default router;
