import QueryBuilder from '../../builder/QueryBuilder';
import { deleteImageIntoCloduinary } from '../../utils/deleteImageFromCloudinary';
import { uploadImageIntoCloduinary } from '../../utils/uploadImageToCloudinary';
import { IPost } from './post.interface';
import { Post } from './post.model';

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find(), query)
    .search(['title'])
    .filter()
    .paginate();
  const result = await postQuery?.modelQuery;
  const count = await postQuery?.countTotal();
  return { result, count };
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id);
  return result;
};

const createPostIntoDB = async (payload: IPost, file: any) => {
  const { url } = await uploadImageIntoCloduinary(file);
  const result = await Post.create({ ...payload, image: url });
  return result;
};

const updatePostIntoDB = async (
  id: string,
  payload: Partial<IPost>,
  file: any,
) => {
  let result;
  if (file?.path) {
    const { url } = await uploadImageIntoCloduinary(file);
    result = await Post.findByIdAndUpdate(id, {
      ...payload,
      image: url,
    });
  } else {
    result = await Post.findByIdAndUpdate(id, payload);
  }
  return result;
};

const deletePostFromDB = async (id: string) => {
  const { image }: { image: string } = await Post.findById(id).select('image');
  await deleteImageIntoCloduinary(image);
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
