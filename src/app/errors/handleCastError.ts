import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import fs from 'fs';

const handleCastError = (
  err: mongoose.Error.CastError,
  file: any,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  if (file) {
    fs.unlinkSync(file);
  }

  return {
    statusCode,
    message: 'Duplicate error',
    errorSources,
  };
};

export default handleCastError;
