import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createParticipantGoalSchema = wrapSchema({
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    strategy: Joi.string().required(),
    support: Joi.string().required(),
    type: Joi.string()
      .valid("Short Term", "Medium Term", "Long Term")
      .required(),
    status: Joi.string().valid("Draft", "In Progress", "Achieved").required(),
    comments: Joi.string().allow("", null),
    startDate: Joi.date().required(),
    reviewDate: Joi.date().allow(null),
    dueDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const editParticipantGoalSchema = wrapSchema({
  params: Joi.object().keys({
    participantGoalId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    strategy: Joi.string().required(),
    support: Joi.string().required(),
    type: Joi.string()
      .valid("Short Term", "Medium Term", "Long Term")
      .required(),
    status: Joi.string().valid("Draft", "In Progress", "Achieved").required(),
    comments: Joi.string().allow("", null),
    startDate: Joi.date().required(),
    reviewDate: Joi.date().allow(null),
    dueDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const deleteParticipantGoalSchema = wrapSchema({
  params: Joi.object().keys({
    participantGoalId: requiredUUIDSchema(),
  }),
});

const deleteArchiveParticipantGoalSchema = wrapSchema({
  params: Joi.object().keys({
    participantGoalId: requiredUUIDSchema(),
  }),
});

const getParticipantGoalByIdSchema = wrapSchema({
  params: Joi.object().keys({
    participantGoalId: requiredUUIDSchema(),
  }),
});

const getParticipantGoalSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createParticipantGoal: joiMiddleware(createParticipantGoalSchema),
  editParticipantGoal: joiMiddleware(editParticipantGoalSchema),
  deleteParticipantGoal: joiMiddleware(deleteParticipantGoalSchema),
  deleteArchiveParticipantGoal: joiMiddleware(
    deleteArchiveParticipantGoalSchema
  ),
  getParticipantGoalById: joiMiddleware(getParticipantGoalByIdSchema),
  getParticipantGoals: joiMiddleware(getParticipantGoalSchema),
};
