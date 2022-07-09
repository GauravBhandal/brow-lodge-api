import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createParticipantExpenseSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalExpense: Joi.number().required(),
    description: Joi.string(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editParticipantExpenseSchema = wrapSchema({
  params: Joi.object().keys({ participantExpenseId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalExpense: Joi.number().required(),
    description: Joi.string(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteParticipantExpenseSchema = wrapSchema({
  params: Joi.object().keys({
    participantExpenseId: requiredUUIDSchema(),
  }),
});

const getParticipantExpenseByIdSchema = wrapSchema({
  params: Joi.object().keys({
    participantExpenseId: requiredUUIDSchema(),
  }),
});

const getParticipantExpenseSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createParticipantExpense: joiMiddleware(createParticipantExpenseSchema),
  editParticipantExpense: joiMiddleware(editParticipantExpenseSchema),
  deleteParticipantExpense: joiMiddleware(deleteParticipantExpenseSchema),
  getParticipantExpenseById: joiMiddleware(getParticipantExpenseByIdSchema),
  getParticipantExpenses: joiMiddleware(getParticipantExpenseSchema),
};
