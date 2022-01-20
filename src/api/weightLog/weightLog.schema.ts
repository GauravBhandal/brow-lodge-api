import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createWeightLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    reading: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editWeightLogSchema = wrapSchema({
  params: Joi.object().keys({ weightLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    reading: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteWeightLogSchema = wrapSchema({
  params: Joi.object().keys({
    weightLogId: requiredUUIDSchema(),
  }),
});

const getWeightLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    weightLogId: requiredUUIDSchema(),
  }),
});

const getWeightLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createWeightLog: joiMiddleware(createWeightLogSchema),
  editWeightLog: joiMiddleware(editWeightLogSchema),
  deleteWeightLog: joiMiddleware(deleteWeightLogSchema),
  getWeightLogById: joiMiddleware(getWeightLogByIdSchema),
  getWeightLogs: joiMiddleware(getWeightLogSchema),
};
