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
import { AddonRoutes } from '../modules/Addon/addon.route';
import { BrandRoutes } from '../modules/Brand/brand.route';
import { MembershipCancellationRoutes } from '../modules/MembershipCancellation/membershipCancellation.route';
import { BundleCreditPackageRoutes } from '../modules/BundleCreditPack/bundleCreditPack.route';
import { SizeRoutes } from '../modules/Size/size.route';
import { ColorRoutes } from '../modules/Color/color.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { AppointmentPaymentRoutes } from '../modules/AppointmentPayment/appointmentPayment.route';
import { MembershipPaymentRoutes } from '../modules/MembershipPayment/membershipPayment.route';
import { ClassPaymentRoutes } from '../modules/ClassPayment/classPayment.route';
import { ShopPaymentRoutes } from '../modules/ShopPayment/shopPayment.route';
import { BootcampPaymentRoutes } from '../modules/BootcampPayment/bootcampPayment.route';
import { FacilityPaymentRoutes } from '../modules/FacilityPayment/facilityPayment.route';
import { TournamentPaymentRoutes } from '../modules/TournamentPayment/tournamentPayment.route';
import { OverviewReportRoutes } from '../modules/OverviewReport/overviewReport.route';
import { NotificationRoutes } from '../modules/Notification/notification.route';
import { FacilityReportsRoutes } from '../modules/FacilityReport/facilityReport.route';
import { ClassReportsRoutes } from '../modules/ClassReport/classReport.route';
import { CourseReportsRoutes } from '../modules/CourseReport/courseReport.route';
import { AppointmentOneOnOneReportsRoutes } from '../modules/AppointmentOneOnOneReport/appointmentOneOnOneReport.route';
import { AppointmentGroupReportsRoutes } from '../modules/AppointmentGroupReport/appointmentGroupReport.route';
import { TempLinkRoutes } from '../modules/TempLink/tempLink.route';
import { CustomMembershipRoutes } from '../modules/CustomMembership/customMembership.router';
import { TeamMembershipRouter } from '../modules/TeamMembership/teamMembership.router';
import { AcademyRoutes } from '../modules/Academy/academy.router';
import { AcademyStudentRoutes } from '../modules/AcademyStudent/acadentStudent.router';
import { TrackRoutes } from '../modules/TrackStudent/trackStudent.router';
import { GiftCardRoutes } from '../modules/GiftCard/giftCard.router';

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
    path: '/appointment/payments',
    route: AppointmentPaymentRoutes,
  },
  {
    path: '/membership/payments',
    route: MembershipPaymentRoutes,
  },
  {
    path: '/class/payments',
    route: ClassPaymentRoutes,
  },
  {
    path: '/shop/payments',
    route: ShopPaymentRoutes,
  },
  {
    path: '/bootcamp/payments',
    route: BootcampPaymentRoutes,
  },
  {
    path: '/facility/payments',
    route: FacilityPaymentRoutes,
  },
  {
    path: '/tournament/payments',
    route: TournamentPaymentRoutes,
  },
  {
    path: '/cancellation/memberships',
    route: MembershipCancellationRoutes,
  },
  {
    path: '/bundle-credit-package',
    route: BundleCreditPackageRoutes,
  },
  {
    path: '/sizes',
    route: SizeRoutes,
  },
  {
    path: '/colors',
    route: ColorRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/temp-booking',
    route: TempLinkRoutes,
  },
  {
    path: '/reports/overview',
    route: OverviewReportRoutes,
  },
  {
    path: '/reports/facilities',
    route: FacilityReportsRoutes,
  },
  {
    path: '/reports/classes',
    route: ClassReportsRoutes,
  },
  {
    path: '/reports/courses',
    route: CourseReportsRoutes,
  },
  {
    path: '/reports/appointment/one-on-one',
    route: AppointmentOneOnOneReportsRoutes,
  },
  {
    path: '/reports/appointment/group',
    route: AppointmentGroupReportsRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/stripe-payment',
    route: StripePaymentRoutes,
  },
  {
    path: '/custom-membership',
    route: CustomMembershipRoutes,
  },
  {
    path: '/team-membership',
    route: TeamMembershipRouter,
  },
  {
    path: '/academies',
    route: AcademyRoutes,
  },
  {
    path: '/academy-students',
    route: AcademyStudentRoutes,
  },
  {
    path: '/attendance',
    route: TrackRoutes,
  },
  {
    path: '/gift-cards',
    route: GiftCardRoutes,
  },
];

mainRoutes.forEach(route => router.use(route.path, route.route));

export default router;
