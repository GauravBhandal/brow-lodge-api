import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createPrnAdminLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    medication: Joi.string().required(),
    dosage: Joi.string().required(),
    reason: Joi.string().required(),
    outcome: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editPrnAdminLogSchema = wrapSchema({
  params: Joi.object().keys({ prnAdminLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    medication: Joi.string().required(),
    dosage: Joi.string().required(),
    reason: Joi.string().required(),
    outcome: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deletePrnAdminLogSchema = wrapSchema({
  params: Joi.object().keys({
    prnAdminLogId: requiredUUIDSchema(),
  }),
});

const deleteArchivePrnAdminLogSchema = wrapSchema({
  params: Joi.object().keys({
    prnAdminLogId: requiredUUIDSchema(),
  }),
});

const getPrnAdminLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    prnAdminLogId: requiredUUIDSchema(),
  }),
});

const getPrnAdminLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createPrnAdminLog: joiMiddleware(createPrnAdminLogSchema),
  editPrnAdminLog: joiMiddleware(editPrnAdminLogSchema),
  deletePrnAdminLog: joiMiddleware(deletePrnAdminLogSchema),
  deleteArchivePrnAdminLog: joiMiddleware(deleteArchivePrnAdminLogSchema),
  getPrnAdminLogById: joiMiddleware(getPrnAdminLogByIdSchema),
  getPrnAdminLogs: joiMiddleware(getPrnAdminLogSchema),
};
