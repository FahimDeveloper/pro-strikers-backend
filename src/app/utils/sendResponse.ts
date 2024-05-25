import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  result?: T | T[],
  total?: number,
) => {
  return res.status(statusCode).json({
    total: total,
    message: message,
    result: result,
  });
};

export default sendResponse;
