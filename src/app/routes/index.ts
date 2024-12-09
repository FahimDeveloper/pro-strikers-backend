import express from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { UserRoutes } from '../modules/User/user.route';
import { ClassRoutes } from '../modules/ClassSchedule/classSchedule.route';
import { CourseRoutes } from '../modules/CourseSchedule/courseSchedule.route';
import { GroupAppointmentRoutes } from '../modules/GroupAppointmentSchedule/groupAppointmentSchedule.route';
import { FacilityRoutes } from '../modules/FacilitySchedule/facilitySchedule.route';
import { VoucherRoute } from '../modules/Voucher/voucher.route';
import { PostRoutes } from '../modules/Post/post.route';
import { EventRoutes } from '../modules/Events/events.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { LaneRoutes } from '../modules/Lane/lane.route';
import { OrderRoutes } from '../modules/Orders/order.route';
import { ClassReservationRoutes } from '../modules/ClassReservation/classReservation.route';
import { CourseReservationRoutes } from '../modules/CoursesReservation/coursesReservation.route';
import { FacilityReservationRoutes } from '../modules/FacilityReservation/facilityReservation.route';
import { AppointmentGroupReservationRoutes } from '../modules/AppointmentGroupReservation/appointmentGroupReservation.route';
import { AppointmentOneOnOneReservationRoutes } from '../modules/AppointmentOneOnOneReservation/appointmentOneOnOneReservation.route';
import { EventIndividualReservationRoutes } from '../modules/EventIndividualReservation/eventIndividualReservation.route';
import { EventGroupReservationRoutes } from '../modules/EventGroupReservation/eventGroupReservation.route';
import { SlotRoutes } from '../modules/SlotBooking/slotBooking.route';
import { OneAppointmentRoutes } from '../modules/OneAppointmentSchedule/oneAppointmentSchedule.route';
import { AuthenticationRoutes } from '../modules/Authentication/Authentication.route';
import { StripePaymentRoutes } from '../modules/StripePayment/stripePayment.route';
import { WebPaymentRoutes } from '../modules/WebPayment/webPayment.route';
import { AddonRoutes } from '../modules/Addon/addon.route';
import { BrandRoutes } from '../modules/Brand/brand.route';
import { MembershipCancellationRoutes } from '../modules/MembershipCancellation/membershipCancellation.route';
import { BundleCreditPackageRoutes } from '../modules/BundleCreditPack/bundleCreditPack.route';

const router = express.Router();
const mainRoutes = [
  {
    path: '/auth',
    route: AuthenticationRoutes,
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
    path: '/schedule/appointments/group',
    route: GroupAppointmentRoutes,
  },
  {
    path: '/schedule/appointments/one-on-one',
    route: OneAppointmentRoutes,
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
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/lanes',
    route: LaneRoutes,
  },
  {
    path: '/addons',
    route: AddonRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
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
    path: '/reservations/slot-bookings',
    route: SlotRoutes,
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
  {
    path: '/payments',
    route: WebPaymentRoutes,
  },
  {
    path: '/stripe-payment',
    route: StripePaymentRoutes,
  },
  {
    path: '/cancellation/memberships',
    route: MembershipCancellationRoutes,
  },
  {
    path: '/bundle-credit-package',
    route: BundleCreditPackageRoutes,
  },
];

mainRoutes.forEach(route => router.use(route.path, route.route));

export default router;
