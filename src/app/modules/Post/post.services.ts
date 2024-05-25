import { IPost } from './post.interface';
import { Post } from './post.model';

const getAllPostFromDB = async () => {
  const result = await Post.find();
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id);
  return result;
};

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const updatePostIntoDB = async (id: string, payload: IPost) => {
  const result = await Post.findByIdAndUpdate(id, payload);
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndDelete(id);
  return result;
};

export const PostServices = {
  getAllPostFromDB,
  getSinglePostFromDB,
  createPostIntoDB,
  updatePostIntoDB,
  deletePostFromDB,
};
