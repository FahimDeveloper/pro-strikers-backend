import express, { NextFunction, Request, Response } from 'express';
import { PostControllers } from './post.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { ROLE } from '../../utils/role';
import { upload } from '../../middlewares/multer.middleware';
import { PostValidations } from './post.validation';
import validateRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.get('/', PostControllers.getAllPosts);
route.get('/:id', PostControllers.getSinglePost);
route.post(
  '/create',
  upload.single('image'),
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(PostValidations.createValidation),
  PostControllers.createPost,
);
route.patch(
  '/update/:id',
  upload.single('image'),
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(PostValidations.updateValidation),
  PostControllers.updatePost,
);
route.delete(
  '/delete/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin),
  PostControllers.deletePost,
);

export const PostRoutes = route;
