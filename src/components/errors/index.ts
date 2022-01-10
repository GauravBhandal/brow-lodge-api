import { Response, Request, NextFunction } from "express";

class CustomError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err: any, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

const handleErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorHandler(err, res);
};

const catchWrap =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export { CustomError, handleErrorMiddleware, catchWrap };
