import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createProgressNoteSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    shiftStartTime: Joi.date().required(),
    shiftEndTime: Joi.date().required(),
    notes: Joi.string().required(),
    dietAndFluids: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editProgressNoteSchema = wrapSchema({
  params: Joi.object().keys({ progressNoteId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    shiftStartTime: Joi.date().required(),
    shiftEndTime: Joi.date().required(),
    notes: Joi.string().required(),
    dietAndFluids: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteProgressNoteSchema = wrapSchema({
  params: Joi.object().keys({
    progressNoteId: requiredUUIDSchema(),
  }),
});

const getProgressNoteByIdSchema = wrapSchema({
  params: Joi.object().keys({
    progressNoteId: requiredUUIDSchema(),
  }),
});

const getProgressNoteSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createProgressNote: joiMiddleware(createProgressNoteSchema),
  editProgressNote: joiMiddleware(editProgressNoteSchema),
  deleteProgressNote: joiMiddleware(deleteProgressNoteSchema),
  getProgressNoteById: joiMiddleware(getProgressNoteByIdSchema),
  getProgressNotes: joiMiddleware(getProgressNoteSchema),
};
