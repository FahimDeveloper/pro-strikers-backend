import httpStatus from 'http-status';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';
import AppError from '../errors/AppError';

export const uploadImageIntoCloduinary = async (file: any) => {
  const path = file?.path;
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  if (!path) {
    throw new AppError(httpStatus.NOT_FOUND, 'image path not found');
  }
  const result = await cloudinary.uploader.upload(path, {
    resource_type: 'image',
  });
  fs.unlinkSync(path);
  return {
    url: result.url,
  };
};
