import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { PostServices } from './post.services';
import sendResponse from '../../utils/sendResponse';

const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB();
  sendResponse(res, httpStatus.OK, 'Post fetched succesfully', result);
});

const getSinglePost = catchAsync(async (req, res) => {
  const result = await PostServices.getSinglePostFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Post fetched succesfully', result);
});

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Post created succesfully', result);
});

const updatePost = catchAsync(async (req, res) => {
  const result = await PostServices.updatePostIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Post updated succesfully', result);
});

const deletePost = catchAsync(async (req, res) => {
  await PostServices.deletePostFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Post deleted succesfully');
});

export const PostControllers = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
