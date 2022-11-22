import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createContinuousImprovementSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    source: Joi.string().required(),
    improvement: Joi.string().required(),
    action: Joi.string().required(),
    status: Joi.string().valid("Draft", "In Progress", "Completed").required(),
    dueDate: Joi.date().allow(null),
    nextReviewDate: Joi.date().allow(null),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
  }),
});

const editContinuousImprovementSchema = wrapSchema({
  params: Joi.object().keys({
    continuousImprovementId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    source: Joi.string().required(),
    improvement: Joi.string().required(),
    action: Joi.string().required(),
    status: Joi.string().valid("Draft", "In Progress", "Completed").required(),
    dueDate: Joi.date().allow(null),
    nextReviewDate: Joi.date().allow(null),
    comments: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
  }),
});

const deleteContinuousImprovementSchema = wrapSchema({
  params: Joi.object().keys({
    continuousImprovementId: requiredUUIDSchema(),
  }),
});

const getContinuousImprovementByIdSchema = wrapSchema({
  params: Joi.object().keys({
    continuousImprovementId: requiredUUIDSchema(),
  }),
});

const getContinuousImprovementSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createContinuousImprovement: joiMiddleware(createContinuousImprovementSchema),
  editContinuousImprovement: joiMiddleware(editContinuousImprovementSchema),
  deleteContinuousImprovement: joiMiddleware(deleteContinuousImprovementSchema),
  getContinuousImprovementById: joiMiddleware(
    getContinuousImprovementByIdSchema
  ),
  getContinuousImprovements: joiMiddleware(getContinuousImprovementSchema),
};
