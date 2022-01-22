import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createBowelLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    status: Joi.string().required(),
    type: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editBowelLogSchema = wrapSchema({
  params: Joi.object().keys({ bowelLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    status: Joi.string().required(),
    type: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteBowelLogSchema = wrapSchema({
  params: Joi.object().keys({
    bowelLogId: requiredUUIDSchema(),
  }),
});

const getBowelLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    bowelLogId: requiredUUIDSchema(),
  }),
});

const getBowelLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createBowelLog: joiMiddleware(createBowelLogSchema),
  editBowelLog: joiMiddleware(editBowelLogSchema),
  deleteBowelLog: joiMiddleware(deleteBowelLogSchema),
  getBowelLogById: joiMiddleware(getBowelLogByIdSchema),
  getBowelLogs: joiMiddleware(getBowelLogSchema),
};
