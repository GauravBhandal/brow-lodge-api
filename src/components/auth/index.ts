import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

import config from "../../config/environment";
import { UserErrorCode } from "../../api/user";
import { CustomError } from "../errors";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    throw new CustomError(403, UserErrorCode.TOKEN_REQUIRED);
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY) as any;
    req.userId = decoded.userId;
  } catch (err) {
    throw new CustomError(401, UserErrorCode.INVALID_TOKEN);
  }
  return next();
};

export default authMiddleware;
