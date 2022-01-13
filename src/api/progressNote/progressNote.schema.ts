import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createProgressNoteSchema = wrapSchema({
  body: Joi.object().keys({
    notes: Joi.string().required(),
  }),
});

const editProgressNoteSchema = wrapSchema({
  params: Joi.object().keys({
    progressNoteId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    notes: Joi.string().required(),
  }),
});

const deleteProgressNoteSchema = wrapSchema({
  params: Joi.object().keys({
    progressNoteId: requiredUUIDSchema(),
  }),
});

const getProgressNoteSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
  }),
});

const getProgressNoteByIdSchema = wrapSchema({
  params: Joi.object().keys({
    progressNoteId: requiredUUIDSchema(),
  }),
});

export default {
  createProgressNote: joiMiddleware(createProgressNoteSchema),
  editProgressNote: joiMiddleware(editProgressNoteSchema),
  deleteProgressNote: joiMiddleware(deleteProgressNoteSchema),
  getProgressNotes: joiMiddleware(getProgressNoteSchema),
  getProgressNoteById: joiMiddleware(getProgressNoteByIdSchema),
};
