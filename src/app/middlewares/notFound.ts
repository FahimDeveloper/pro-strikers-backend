/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../utils/sendResponse';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, httpStatus.NOT_FOUND, 'API not found !!');
};

export default notFound;
