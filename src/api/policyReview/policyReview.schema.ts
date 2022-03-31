import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createPolicyReviewSchema = wrapSchema({
  body: Joi.object().keys({
    version: Joi.string().required(),
    staffEducationCompleted: Joi.string().required(),
    consultationWith: Joi.string().required(),
    reasonForUpdate: Joi.string().required(),
    date: Joi.date().required(),
    staff: requiredUUIDSchema(),
    policy: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const editPolicyReviewSchema = wrapSchema({
  params: Joi.object().keys({ policyReviewId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    version: Joi.string().required(),
    staffEducationCompleted: Joi.string().required(),
    consultationWith: Joi.string().required(),
    reasonForUpdate: Joi.string().required(),
    date: Joi.date().required(),
    staff: requiredUUIDSchema(),
    policy: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const deletePolicyReviewSchema = wrapSchema({
  params: Joi.object().keys({
    policyReviewId: requiredUUIDSchema(),
  }),
});

const getPolicyReviewByIdSchema = wrapSchema({
  params: Joi.object().keys({
    policyReviewId: requiredUUIDSchema(),
  }),
});

const getPolicyReviewSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createPolicyReview: joiMiddleware(createPolicyReviewSchema),
  editPolicyReview: joiMiddleware(editPolicyReviewSchema),
  deletePolicyReview: joiMiddleware(deletePolicyReviewSchema),
  getPolicyReviewById: joiMiddleware(getPolicyReviewByIdSchema),
  getPolicyReviews: joiMiddleware(getPolicyReviewSchema),
};
