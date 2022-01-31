import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createLeaseAndUtilityLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    documentName: Joi.string().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editLeaseAndUtilityLogSchema = wrapSchema({
  params: Joi.object().keys({ leaseAndUtilityLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    documentName: Joi.string().required(),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteLeaseAndUtilityLogSchema = wrapSchema({
  params: Joi.object().keys({
    leaseAndUtilityLogId: requiredUUIDSchema(),
  }),
});

const getLeaseAndUtilityLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    leaseAndUtilityLogId: requiredUUIDSchema(),
  }),
});

const getLeaseAndUtilityLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createLeaseAndUtilityLog: joiMiddleware(createLeaseAndUtilityLogSchema),
  editLeaseAndUtilityLog: joiMiddleware(editLeaseAndUtilityLogSchema),
  deleteLeaseAndUtilityLog: joiMiddleware(deleteLeaseAndUtilityLogSchema),
  getLeaseAndUtilityLogById: joiMiddleware(getLeaseAndUtilityLogByIdSchema),
  getLeaseAndUtilityLogs: joiMiddleware(getLeaseAndUtilityLogSchema),
};
