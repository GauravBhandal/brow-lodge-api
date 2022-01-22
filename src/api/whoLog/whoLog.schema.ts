import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createWhoLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    category: Joi.string().required(),
    location: Joi.string().allow("", null),
    nextReviewDate: Joi.date().allow("", null),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
  }),
});

const editWhoLogSchema = wrapSchema({
  params: Joi.object().keys({ whoLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    category: Joi.string().required(),
    location: Joi.string().allow("", null),
    nextReviewDate: Joi.date().allow("", null),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
  }),
});

const deleteWhoLogSchema = wrapSchema({
  params: Joi.object().keys({
    whoLogId: requiredUUIDSchema(),
  }),
});

const getWhoLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    whoLogId: requiredUUIDSchema(),
  }),
});

const getWhoLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createWhoLog: joiMiddleware(createWhoLogSchema),
  editWhoLog: joiMiddleware(editWhoLogSchema),
  deleteWhoLog: joiMiddleware(deleteWhoLogSchema),
  getWhoLogById: joiMiddleware(getWhoLogByIdSchema),
  getWhoLogs: joiMiddleware(getWhoLogSchema),
};
