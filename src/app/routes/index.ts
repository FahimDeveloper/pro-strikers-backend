import express from 'express';
import { userRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/AUTH/auth.route';
const router = express.Router();

const mainRoutes = [
  {
    path: '/',
    route: userRoutes,
  },
  {
    path: '/',
    route: AuthRoutes,
  },
];

mainRoutes.forEach(route => router.use(route.path, route.route));

export default router;
