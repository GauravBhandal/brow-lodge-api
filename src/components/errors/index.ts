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

const sanitizeError = (error: any) => {
  let { statusCode, message } = error;

  if (error.name === "UnauthorizedError") {
    statusCode = 401;
  } else if (error.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = "DATABASE_VALIDATION_ERROR";
  }

  if (!statusCode) {
    statusCode = 500;
    message = "INTERNAL_SERVER_ERROR";
  }

  return { statusCode, message };
};

const handleErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customErr = sanitizeError(err);
  console.log("TODO: add error logger and sentry", err);
  const { statusCode, message } = customErr;
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

const catchWrap =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export { CustomError, handleErrorMiddleware, catchWrap };
