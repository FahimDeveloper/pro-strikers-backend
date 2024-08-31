import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  result?: T | T[],
  count?: number,
) => {
  return res.status(statusCode).json({
    message: message,
    count: count,
    results: result,
  });
};

export default sendResponse;
