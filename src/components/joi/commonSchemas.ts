import { Request, Response, NextFunction } from "express";
import Joi, { Schema, ValidationOptions, SchemaMap } from "joi";

const defaultJoiOptions = {};

export const MIN_CHARACTERS = 2;
export const MAX_CHARACTERS = 255;

export const requiredUUIDSchema = () =>
  Joi.string().uuid({ version: "uuidv4" }).required();

export const wrapSchema = (schema: SchemaMap<any>): Schema =>
  Joi.object().keys(schema).unknown();

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
