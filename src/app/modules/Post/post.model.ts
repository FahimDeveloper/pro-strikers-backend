import { Schema, model } from 'mongoose';
import { IPost } from './post.interface';

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const Post = model<IPost>('Post', postSchema);
