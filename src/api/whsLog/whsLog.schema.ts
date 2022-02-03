import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createWhsLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    category: Joi.string().required(),
    location: Joi.string().allow("", null),
    nextReviewDate: Joi.date().allow("", null),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const editWhsLogSchema = wrapSchema({
  params: Joi.object().keys({ whsLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    category: Joi.string().required(),
    location: Joi.string().allow("", null),
    nextReviewDate: Joi.date().allow("", null),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const deleteWhsLogSchema = wrapSchema({
  params: Joi.object().keys({
    whsLogId: requiredUUIDSchema(),
  }),
});

const getWhsLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    whsLogId: requiredUUIDSchema(),
  }),
});

const getWhsLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createWhsLog: joiMiddleware(createWhsLogSchema),
  editWhsLog: joiMiddleware(editWhsLogSchema),
  deleteWhsLog: joiMiddleware(deleteWhsLogSchema),
  getWhsLogById: joiMiddleware(getWhsLogByIdSchema),
  getWhsLogs: joiMiddleware(getWhsLogSchema),
};
