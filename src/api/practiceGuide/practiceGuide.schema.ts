import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createPracticeGuideSchema = wrapSchema({
  body: Joi.object().keys({
    nextReviewDate: Joi.date().allow(null),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editPracticeGuideSchema = wrapSchema({
  params: Joi.object().keys({ practiceGuideId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    nextReviewDate: Joi.date().allow(null),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deletePracticeGuideSchema = wrapSchema({
  params: Joi.object().keys({
    practiceGuideId: requiredUUIDSchema(),
  }),
});

const getPracticeGuideByIdSchema = wrapSchema({
  params: Joi.object().keys({
    practiceGuideId: requiredUUIDSchema(),
  }),
});

const getPracticeGuideSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createPracticeGuide: joiMiddleware(createPracticeGuideSchema),
  editPracticeGuide: joiMiddleware(editPracticeGuideSchema),
  deletePracticeGuide: joiMiddleware(deletePracticeGuideSchema),
  getPracticeGuideById: joiMiddleware(getPracticeGuideByIdSchema),
  getPracticeGuides: joiMiddleware(getPracticeGuideSchema),
};
