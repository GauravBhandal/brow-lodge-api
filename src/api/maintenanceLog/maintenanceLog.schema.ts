import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createMaintenanceLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const editMaintenanceLogSchema = wrapSchema({
  params: Joi.object().keys({ maintenanceLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const deleteMaintenanceLogSchema = wrapSchema({
  params: Joi.object().keys({
    maintenanceLogId: requiredUUIDSchema(),
  }),
});

const getMaintenanceLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    maintenanceLogId: requiredUUIDSchema(),
  }),
});

const getMaintenanceLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createMaintenanceLog: joiMiddleware(createMaintenanceLogSchema),
  editMaintenanceLog: joiMiddleware(editMaintenanceLogSchema),
  deleteMaintenanceLog: joiMiddleware(deleteMaintenanceLogSchema),
  getMaintenanceLogById: joiMiddleware(getMaintenanceLogByIdSchema),
  getMaintenanceLogs: joiMiddleware(getMaintenanceLogSchema),
};
