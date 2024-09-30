import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import fs from 'fs';

const handleZodError = (err: ZodError, file: any): TGenericErrorResponse => {
  const message: string[] = [];
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    message.push(issue.message);
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
    message: message[0],
    errorSources,
  };
};

export default handleZodError;
