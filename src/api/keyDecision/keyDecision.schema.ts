import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createKeyDecisionSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    description: Joi.string().required(),
    decisionRationale: Joi.string().required(),
    alternativesConsidered: Joi.string().allow(null, ""),
    costImplications: Joi.string().allow(null, ""),
    staff: requiredUUIDSchema(),
  }),
});

const editKeyDecisionSchema = wrapSchema({
  params: Joi.object().keys({ keyDecisionId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    description: Joi.string().required(),
    decisionRationale: Joi.string().required(),
    alternativesConsidered: Joi.string().allow(null, ""),
    costImplications: Joi.string().allow(null, ""),
    staff: requiredUUIDSchema(),
  }),
});

const deleteKeyDecisionSchema = wrapSchema({
  params: Joi.object().keys({
    keyDecisionId: requiredUUIDSchema(),
  }),
});

const deleteArchiveKeyDecisionSchema = wrapSchema({
  params: Joi.object().keys({
    keyDecisionId: requiredUUIDSchema(),
  }),
});

const getKeyDecisionByIdSchema = wrapSchema({
  params: Joi.object().keys({
    keyDecisionId: requiredUUIDSchema(),
  }),
});

const getKeyDecisionSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createKeyDecision: joiMiddleware(createKeyDecisionSchema),
  editKeyDecision: joiMiddleware(editKeyDecisionSchema),
  deleteKeyDecision: joiMiddleware(deleteKeyDecisionSchema),
  deleteArchiveKeyDecision: joiMiddleware(deleteArchiveKeyDecisionSchema),
  getKeyDecisionById: joiMiddleware(getKeyDecisionByIdSchema),
  getKeyDecisions: joiMiddleware(getKeyDecisionSchema),
};
