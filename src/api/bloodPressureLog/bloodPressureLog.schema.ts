import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createBloodPressureLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    upper: Joi.number().required(),
    lower: Joi.number().required(),
    pulse: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editBloodPressureLogSchema = wrapSchema({
  params: Joi.object().keys({ bloodPressureLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    upper: Joi.number().required(),
    lower: Joi.number().required(),
    pulse: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteBloodPressureLogSchema = wrapSchema({
  params: Joi.object().keys({
    bloodPressureLogId: requiredUUIDSchema(),
  }),
});

const deleteArchiveBloodPressureLogSchema = wrapSchema({
  params: Joi.object().keys({
    bloodPressureLogId: requiredUUIDSchema(),
  }),
});

const getBloodPressureLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    bloodPressureLogId: requiredUUIDSchema(),
  }),
});

const getBloodPressureLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createBloodPressureLog: joiMiddleware(createBloodPressureLogSchema),
  editBloodPressureLog: joiMiddleware(editBloodPressureLogSchema),
  deleteBloodPressureLog: joiMiddleware(deleteBloodPressureLogSchema),
  deleteArchiveBloodPressureLog: joiMiddleware(
    deleteArchiveBloodPressureLogSchema
  ),
  getBloodPressureLogById: joiMiddleware(getBloodPressureLogByIdSchema),
  getBloodPressureLogs: joiMiddleware(getBloodPressureLogSchema),
};
