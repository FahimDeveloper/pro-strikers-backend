import { TErrorSources } from '../interface/error';
import fs from 'fs';

type TJsonWebTokenError = {
  name: string;
  message: string;
};
export const handleJsonWebTokenError = (err: TJsonWebTokenError, file: any) => {
  const errorSources: TErrorSources = [
    {
      path: `${err?.name}`,
      message: `${err?.message}`,
    },
  ];

  const statusCode = 401;
  if (file) {
    fs.unlinkSync(file);
  }
  return {
    statusCode,
    message: err?.message,
    errorSources,
  };
};
