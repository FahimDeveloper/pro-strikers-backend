import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { PostServices } from './post.services';
import sendResponse from '../../utils/sendResponse';

const getAllPosts = catchAsync(async (req, res) => {
  const { result, count } = await PostServices.getAllPostFromDB(req.query);
  sendResponse(res, httpStatus.OK, 'Posts fetched succesfully', result, count);
});

const getSinglePost = catchAsync(async (req, res) => {
  const result = await PostServices.getSinglePostFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Post fetched succesfully', result);
});

const createPost = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await PostServices.createPostIntoDB(req.body, file);
  sendResponse(res, httpStatus.CREATED, 'Post created succesfully', result);
});

const updatePost = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await PostServices.updatePostIntoDB(
    req.params.id,
    req.body,
    file,
  );
  sendResponse(res, httpStatus.OK, 'Post updated succesfully', result);
});

const deletePost = catchAsync(async (req, res) => {
  await PostServices.deletePostFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Post deleted succesfully');
});

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
