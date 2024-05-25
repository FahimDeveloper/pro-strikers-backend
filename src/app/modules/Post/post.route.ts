import express from 'express';
import { PostControllers } from './post.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';

const route = express.Router();

route.get('/', PostControllers.getAllPost);
route.get('/:id', PostControllers.getSinglePost);
route.post(
  '/create',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  PostControllers.createPost,
);
route.patch(
  '/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  PostControllers.updatePost,
);
route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  PostControllers.deletePost,
);

export const PostRoutes = route;
