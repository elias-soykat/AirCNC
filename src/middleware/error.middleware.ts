import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '../utils/status-code.util';
const { NOT_FOUND } = HTTP_STATUS;

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`${NOT_FOUND.message} - ${req.originalUrl}`);
  res.status(NOT_FOUND.code);
  next(error);
};

const errResponder = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export { errResponder, notFound };
