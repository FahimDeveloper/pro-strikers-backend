import { Response } from 'express';

const sendResponse = <T>(res: Response, statusCode: number, message: string, result: T | T[]) => {
  return res.status(statusCode).json({
    success: true,
    statusCode: statusCode,
    message: message,
    data: result,
  });
};

export default sendResponse;
