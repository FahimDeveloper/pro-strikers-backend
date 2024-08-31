import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import fs from 'fs';

const handleZodError = (err: ZodError, file: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  if (file) {
    fs.unlinkSync(file);
  }
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
