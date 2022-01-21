import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createBloodGlucoseLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required(),
    reading: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editBloodGlucoseLogSchema = wrapSchema({
  params: Joi.object().keys({ bloodGlucoseLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required(),
    reading: Joi.number().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteBloodGlucoseLogSchema = wrapSchema({
  params: Joi.object().keys({
    bloodGlucoseLogId: requiredUUIDSchema(),
  }),
});

const getBloodGlucoseLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    bloodGlucoseLogId: requiredUUIDSchema(),
  }),
});

const getBloodGlucoseLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createBloodGlucoseLog: joiMiddleware(createBloodGlucoseLogSchema),
  editBloodGlucoseLog: joiMiddleware(editBloodGlucoseLogSchema),
  deleteBloodGlucoseLog: joiMiddleware(deleteBloodGlucoseLogSchema),
  getBloodGlucoseLogById: joiMiddleware(getBloodGlucoseLogByIdSchema),
  getBloodGlucoseLogs: joiMiddleware(getBloodGlucoseLogSchema),
};
