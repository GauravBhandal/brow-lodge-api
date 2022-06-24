import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createProgressNotesSettingSchema = wrapSchema({
  body: Joi.object().keys({
    customFieldData: Joi.array().allow(null),
  }),
});

const editProgressNotesSettingSchema = wrapSchema({
  params: Joi.object().keys({
    progressNotesSettingId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    isRequired: Joi.boolean().required(),
    name: Joi.string().required(),
  }),
});

const deleteProgressNotesSettingSchema = wrapSchema({
  params: Joi.object().keys({
    progressNotesSettingId: requiredUUIDSchema(),
  }),
});

const getProgressNotesSettingByIdSchema = wrapSchema({
  params: Joi.object().keys({
    progressNotesSettingId: requiredUUIDSchema(),
  }),
});

const getProgressNotesSettingSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createProgressNotesSetting: joiMiddleware(createProgressNotesSettingSchema),
  editProgressNotesSetting: joiMiddleware(editProgressNotesSettingSchema),
  deleteProgressNotesSetting: joiMiddleware(deleteProgressNotesSettingSchema),
  getProgressNotesSettingById: joiMiddleware(getProgressNotesSettingByIdSchema),
  getProgressNotesSettings: joiMiddleware(getProgressNotesSettingSchema),
};
