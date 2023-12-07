import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createEyelashExtensionDetailSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    therapist: Joi.string().required().trim(),
    clientSign: Joi.string().required().trim(),
    feedback: Joi.string().allow("", null),
    eyeFeedback: Joi.string().allow("", null),
    careFeedback: Joi.string().allow("", null),
    eyelash: requiredUUIDSchema(),
  }),
});

const editEyelashExtensionDetailSchema = wrapSchema({
  params: Joi.object().keys({ eyelashExtensionDetailId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    therapist: Joi.string().required().trim(),
    clientSign: Joi.string().required().trim(),
    feedback: Joi.string().allow("", null),
    eyeFeedback: Joi.string().allow("", null),
    careFeedback: Joi.string().allow("", null),
    eyelash: requiredUUIDSchema(),
  }),
});

const deleteEyelashExtensionDetailSchema = wrapSchema({
  params: Joi.object().keys({
    eyelashExtensionDetailId: requiredUUIDSchema(),
  }),
});

const getEyelashExtensionDetailByIdSchema = wrapSchema({
  params: Joi.object().keys({
    eyelashExtensionDetailId: requiredUUIDSchema(),
  }),
});

const getEyelashExtensionDetailSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createEyelashExtensionDetail: joiMiddleware(
    createEyelashExtensionDetailSchema
  ),
  editEyelashExtensionDetail: joiMiddleware(editEyelashExtensionDetailSchema),
  deleteEyelashExtensionDetail: joiMiddleware(
    deleteEyelashExtensionDetailSchema
  ),
  getEyelashExtensionDetailById: joiMiddleware(
    getEyelashExtensionDetailByIdSchema
  ),
  getEyelashExtensionDetails: joiMiddleware(getEyelashExtensionDetailSchema),
};
