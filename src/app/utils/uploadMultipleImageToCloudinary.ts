import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const uploadMultipleImageIntoCloduinary = async (files: any) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  if (!files.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'images not found');
  }
  try {
    const urls = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'image',
      });
      urls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }
    return urls;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};
