import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema,requiredTimeSchema()} from "../../common/joiSchemas";

const create MaintenanceLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
  }),
});

const edit MaintenanceLogSchema = wrapSchema({
  params: Joi.object().keys({ maintenanceLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema().required(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
  }),
});

const delete MaintenanceLogSchema = wrapSchema({
  params: Joi.object().keys({
    maintenanceLogId: requiredUUIDSchema(),
  }),
});

const get MaintenanceLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    maintenanceLogId: requiredUUIDSchema(),
  }),
});

const get MaintenanceLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  create MaintenanceLog: joiMiddleware(create MaintenanceLogSchema),
  edit MaintenanceLog: joiMiddleware(edit MaintenanceLogSchema),
  delete MaintenanceLog: joiMiddleware(delete MaintenanceLogSchema),
  get MaintenanceLogById: joiMiddleware(get MaintenanceLogByIdSchema),
  get MaintenanceLogs: joiMiddleware(get MaintenanceLogSchema),
};
