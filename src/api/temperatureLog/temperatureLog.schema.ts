import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createTemperatureLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    reading: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editTemperatureLogSchema = wrapSchema({
  params: Joi.object().keys({ temperatureLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    reading: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteTemperatureLogSchema = wrapSchema({
  params: Joi.object().keys({
    temperatureLogId: requiredUUIDSchema(),
  }),
});

const getTemperatureLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    temperatureLogId: requiredUUIDSchema(),
  }),
});

const getTemperatureLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTemperatureLog: joiMiddleware(createTemperatureLogSchema),
  editTemperatureLog: joiMiddleware(editTemperatureLogSchema),
  deleteTemperatureLog: joiMiddleware(deleteTemperatureLogSchema),
  getTemperatureLogById: joiMiddleware(getTemperatureLogByIdSchema),
  getTemperatureLogs: joiMiddleware(getTemperatureLogSchema),
};
