import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredTimeSchema,
  requiredUUIDSchema,
  wrapSchema,
} from "../../common/joiSchemas";

const createOnCallLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    duration: Joi.string().required(),
    communicationWith: Joi.string().required(),
    description: Joi.string().required(),
    actions: Joi.string().allow("", null),
    followup: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
  }),
});

const editOnCallLogSchema = wrapSchema({
  params: Joi.object().keys({ onCallLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    duration: Joi.string().required(),
    communicationWith: Joi.string().required(),
    description: Joi.string().required(),
    actions: Joi.string().allow("", null),
    followup: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
  }),
});

const deleteOnCallLogSchema = wrapSchema({
  params: Joi.object().keys({
    onCallLogId: requiredUUIDSchema(),
  }),
});

const deleteArchiveOnCallLogSchema = wrapSchema({
  params: Joi.object().keys({
    onCallLogId: requiredUUIDSchema(),
  }),
});

const getOnCallLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    onCallLogId: requiredUUIDSchema(),
  }),
});

const getOnCallLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createOnCallLog: joiMiddleware(createOnCallLogSchema),
  editOnCallLog: joiMiddleware(editOnCallLogSchema),
  deleteOnCallLog: joiMiddleware(deleteOnCallLogSchema),
  deleteArchiveOnCallLog: joiMiddleware(deleteArchiveOnCallLogSchema),
  getOnCallLogById: joiMiddleware(getOnCallLogByIdSchema),
  getOnCallLogs: joiMiddleware(getOnCallLogSchema),
};
