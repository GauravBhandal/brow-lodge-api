import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  requiredTimeSchema,
  wrapSchema,
} from "../../common/joiSchemas";

const typeSchema = Joi.object().keys({
  startTime: requiredTimeSchema(),
  type: requiredUUIDSchema(),
});

// TODO: Add meta
const shiftRepeatSchema = Joi.object()
  .allow(null)
  .keys({
    frequency: Joi.string().valid("daily", "weekly").allow(null),
    every: Joi.number().min(1).allow(null),
    occurrences: Joi.number().min(1).allow(null),
    repeatEndDate: Joi.date().allow(null),
    days: Joi.array(),
  });

const createShiftRecordSchema = wrapSchema({
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    staff: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    types: Joi.array().items(typeSchema).required(),
    repeat: shiftRepeatSchema,
  }),
});

const editShiftRecordSchema = wrapSchema({
  params: Joi.object().keys({ shiftRecordId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    staff: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    types: Joi.array().items(typeSchema).required(),
  }),
});

const deleteShiftRecordSchema = wrapSchema({
  params: Joi.object().keys({
    shiftRecordId: requiredUUIDSchema(),
  }),
});

const getShiftRecordByIdSchema = wrapSchema({
  params: Joi.object().keys({
    shiftRecordId: requiredUUIDSchema(),
  }),
});

const getShiftRecordSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createShiftRecord: joiMiddleware(createShiftRecordSchema),
  editShiftRecord: joiMiddleware(editShiftRecordSchema),
  deleteShiftRecord: joiMiddleware(deleteShiftRecordSchema),
  getShiftRecordById: joiMiddleware(getShiftRecordByIdSchema),
  getShiftRecords: joiMiddleware(getShiftRecordSchema),
};
