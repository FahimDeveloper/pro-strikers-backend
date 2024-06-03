import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const deleteImageIntoCloduinary = async (file: string) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  const match = file.match(/\/v[^/]+\/([^/]+)\./);
  if (match && match[1]) {
    await cloudinary.uploader.destroy(match[1]);
  }
};
