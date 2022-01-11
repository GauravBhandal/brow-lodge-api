import { Request, Response, NextFunction } from "express";
import { Schema, ValidationOptions } from "joi";

const defaultJoiOptions = {};

const joiExpressMiddleware =
  (schema: Schema, defaultJoiOptions: ValidationOptions) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value: joiReq } = schema.validate(req, defaultJoiOptions);

    if (error) {
      next(error);
      return;
    }

    req.headers = joiReq.headers;
    req.params = joiReq.params;
    req.query = joiReq.query;
    req.cookies = joiReq.cookies;
    req.signedCookies = joiReq.signedCookies;
    req.body = joiReq.body;

    next();
  };

export const joiMiddleware =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    return joiExpressMiddleware(schema, defaultJoiOptions)(req, res, next);
  };
