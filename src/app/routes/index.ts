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
import { StoreRoutes } from '../modules/Store/store.route';
import { LaneRoutes } from '../modules/Lane/lane.route';
import { OrderRoutes } from '../modules/Orders/order.route';
import { ClassReservationRoutes } from '../modules/ClassReservation/classReservation.route';
import { CourseReservationRoutes } from '../modules/CoursesReservation/coursesReservation.route';
import { FacilityReservationRoutes } from '../modules/FacilityReservation/facilityReservation.route';
import { AppointmentGroupReservationRoutes } from '../modules/AppointmentGroupReservation/appointmentGroupReservation.route';
import { AppointmentOneOnOneReservationRoutes } from '../modules/AppointmentOneOnOneReservation/appointmentOneOnOneReservation.route';
import { EventIndividualReservationRoutes } from '../modules/EventIndividualReservation/eventIndividualReservation.route';
import { EventGroupReservationRoutes } from '../modules/EventGroupReservation/eventGroupReservation.route';
const router = express.Router();

const mainRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
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
  {
    path: '/stores',
    route: StoreRoutes,
  },
  {
    path: '/lanes',
    route: LaneRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/reservations/classes',
    route: ClassReservationRoutes,
  },
  {
    path: '/reservations/courses',
    route: CourseReservationRoutes,
  },
  {
    path: '/reservations/facilities',
    route: FacilityReservationRoutes,
  },
  {
    path: '/reservations/appointments/group',
    route: AppointmentGroupReservationRoutes,
  },
  {
    path: '/reservations/appointments/one-on-one',
    route: AppointmentOneOnOneReservationRoutes,
  },
  {
    path: '/reservations/events/individual',
    route: EventIndividualReservationRoutes,
  },
  {
    path: '/reservations/events/group',
    route: EventGroupReservationRoutes,
  },
];

mainRoutes.forEach(route => router.use(route.path, route.route));

export default router;
