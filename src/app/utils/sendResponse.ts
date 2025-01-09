import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  result?: T | T[],
  count?: number,
  summary?: any,
) => {
  return res.status(statusCode).json({
    message: message,
    count: count,
    results: result,
    summary: summary,
  });
};

export default sendResponse;
