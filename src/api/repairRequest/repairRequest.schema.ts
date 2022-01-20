import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createRepairRequestSchema = wrapSchema({
  body: Joi.object().keys({
    problem: Joi.string().required(),
    risk: Joi.string().required(),
    location: Joi.string().required(),
    priority: Joi.string().valid("low", "medium", "high").required(),
    status: Joi.string()
      .valid("completed", "pending", "rejected", "scheduled")
      .required(),
    staff: requiredUUIDSchema(),
  }),
});

const editRepairRequestSchema = wrapSchema({
  params: Joi.object().keys({ repairRequestId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    problem: Joi.string().required(),
    risk: Joi.string().required(),
    location: Joi.string().required(),
    priority: Joi.string().valid("low", "medium", "high").required(),
    status: Joi.string()
      .valid("completed", "pending", "rejected", "scheduled")
      .required(),
    staff: requiredUUIDSchema(),
  }),
});

const deleteRepairRequestSchema = wrapSchema({
  params: Joi.object().keys({
    repairRequestId: requiredUUIDSchema(),
  }),
});

const getRepairRequestByIdSchema = wrapSchema({
  params: Joi.object().keys({
    repairRequestId: requiredUUIDSchema(),
  }),
});

const getRepairRequestSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createRepairRequest: joiMiddleware(createRepairRequestSchema),
  editRepairRequest: joiMiddleware(editRepairRequestSchema),
  deleteRepairRequest: joiMiddleware(deleteRepairRequestSchema),
  getRepairRequestById: joiMiddleware(getRepairRequestByIdSchema),
  getRepairRequests: joiMiddleware(getRepairRequestSchema),
};