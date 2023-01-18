import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createPrnBalanceLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    name: Joi.string().required(),
    balance: Joi.number().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editPrnBalanceLogSchema = wrapSchema({
  params: Joi.object().keys({ prnBalanceLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    name: Joi.string().required(),
    balance: Joi.number().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deletePrnBalanceLogSchema = wrapSchema({
  params: Joi.object().keys({
    prnBalanceLogId: requiredUUIDSchema(),
  }),
});

const deleteArchivePrnBalanceLogSchema = wrapSchema({
  params: Joi.object().keys({
    prnBalanceLogId: requiredUUIDSchema(),
  }),
});

const getPrnBalanceLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    prnBalanceLogId: requiredUUIDSchema(),
  }),
});

const getPrnBalanceLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createPrnBalanceLog: joiMiddleware(createPrnBalanceLogSchema),
  editPrnBalanceLog: joiMiddleware(editPrnBalanceLogSchema),
  deletePrnBalanceLog: joiMiddleware(deletePrnBalanceLogSchema),
  deleteArchivePrnBalanceLog: joiMiddleware(deleteArchivePrnBalanceLogSchema),
  getPrnBalanceLogById: joiMiddleware(getPrnBalanceLogByIdSchema),
  getPrnBalanceLogs: joiMiddleware(getPrnBalanceLogSchema),
};
