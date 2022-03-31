import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createPolicySchema = wrapSchema({
  body: Joi.object().keys({
    nextReviewDate: Joi.date().required(),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editPolicySchema = wrapSchema({
  params: Joi.object().keys({ policyId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    nextReviewDate: Joi.date().required(),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deletePolicySchema = wrapSchema({
  params: Joi.object().keys({
    policyId: requiredUUIDSchema(),
  }),
});

const getPolicyByIdSchema = wrapSchema({
  params: Joi.object().keys({
    policyId: requiredUUIDSchema(),
  }),
});

const getPolicySchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createPolicy: joiMiddleware(createPolicySchema),
  editPolicy: joiMiddleware(editPolicySchema),
  deletePolicy: joiMiddleware(deletePolicySchema),
  getPolicyById: joiMiddleware(getPolicyByIdSchema),
  getPolicies: joiMiddleware(getPolicySchema),
};
