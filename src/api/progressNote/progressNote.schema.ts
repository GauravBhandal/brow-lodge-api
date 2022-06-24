import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createProgressNoteSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    shiftStartTime: requiredTimeSchema(),
    shiftEndTime: requiredTimeSchema(),
    notes: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
    customFieldsData: Joi.object().allow(null),
  }),
});

const editProgressNoteSchema = wrapSchema({
  params: Joi.object().keys({ progressNoteId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    shiftStartTime: requiredTimeSchema(),
    shiftEndTime: requiredTimeSchema(),
    notes: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
    customFieldsData: Joi.object().allow(null),
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
