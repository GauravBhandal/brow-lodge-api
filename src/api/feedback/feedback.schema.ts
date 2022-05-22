import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createFeedbackSchema = wrapSchema({
  body: Joi.object().keys({
    dateReported: Joi.date().required(),
    name: Joi.string().allow("", null),
    email: Joi.string().allow("", null),
    phone: Joi.string().allow("", null),
    youAreA: Joi.string().required(),
    typeOfFeedback: Joi.string().required(),
    feedback: Joi.string().required(),
    assessments: Joi.string().allow("", null),
    actions: Joi.string().allow("", null),
    notifiedOfResult: Joi.string().allow("", null),
    dateClosed: Joi.date().allow(null),
    status: Joi.string().allow("", null),
    staff: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editFeedbackSchema = wrapSchema({
  params: Joi.object().keys({ feedbackId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    dateReported: Joi.date().required(),
    name: Joi.string().allow("", null),
    email: Joi.string().allow("", null),
    phone: Joi.string().allow("", null),
    youAreA: Joi.string().required(),
    typeOfFeedback: Joi.string().required(),
    feedback: Joi.string().required(),
    assessments: Joi.string().allow("", null),
    actions: Joi.string().allow("", null),
    notifiedOfResult: Joi.string().allow("", null),
    dateClosed: Joi.date().allow(null),
    status: Joi.string().allow("", null),
    staff: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteFeedbackSchema = wrapSchema({
  params: Joi.object().keys({
    feedbackId: requiredUUIDSchema(),
  }),
});

const getFeedbackByIdSchema = wrapSchema({
  params: Joi.object().keys({
    feedbackId: requiredUUIDSchema(),
  }),
});

const getFeedbackSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createFeedback: joiMiddleware(createFeedbackSchema),
  editFeedback: joiMiddleware(editFeedbackSchema),
  deleteFeedback: joiMiddleware(deleteFeedbackSchema),
  getFeedbackById: joiMiddleware(getFeedbackByIdSchema),
  getFeedbacks: joiMiddleware(getFeedbackSchema),
};
