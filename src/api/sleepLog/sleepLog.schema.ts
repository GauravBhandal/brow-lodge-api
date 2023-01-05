import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createSleepLogSchema = wrapSchema({
  body: Joi.object().keys({
    sleepLogs: Joi.array()
      .items(
        Joi.object().keys({
          date: Joi.date().required(),
          time: requiredTimeSchema(),
          activity: Joi.string().valid("Awake", "Sleep", "Unknown").required(),
          comments: Joi.string().allow("", null),
          staff: requiredUUIDSchema(),
          client: requiredUUIDSchema(),
        })
      )
      .required(),
  }),
});

const editSleepLogSchema = wrapSchema({
  params: Joi.object().keys({ sleepLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    activity: Joi.string().valid("Awake", "Sleep", "Unknown").required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteSleepLogSchema = wrapSchema({
  params: Joi.object().keys({
    sleepLogId: requiredUUIDSchema(),
  }),
});

const deleteArchiveSleepLogSchema = wrapSchema({
  params: Joi.object().keys({
    sleepLogId: requiredUUIDSchema(),
  }),
});

const getSleepLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    sleepLogId: requiredUUIDSchema(),
  }),
});

const getSleepLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createSleepLog: joiMiddleware(createSleepLogSchema),
  editSleepLog: joiMiddleware(editSleepLogSchema),
  deleteSleepLog: joiMiddleware(deleteSleepLogSchema),
  deleteArchiveSleepLog: joiMiddleware(deleteArchiveSleepLogSchema),
  getSleepLogById: joiMiddleware(getSleepLogByIdSchema),
  getSleepLogs: joiMiddleware(getSleepLogSchema),
};
