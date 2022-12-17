import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createTemplateSchema = wrapSchema({
  body: Joi.object().keys({
    notes: Joi.string().allow("", null),
    name: Joi.string().required(),
    type: Joi.string().required(),
    category: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editTemplateSchema = wrapSchema({
  params: Joi.object().keys({ templateId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    notes: Joi.string().allow("", null),
    name: Joi.string().required(),
    type: Joi.string().required(),
    category: Joi.string().required(),
    version: Joi.string().required(),
    archived: Joi.boolean(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteTemplateSchema = wrapSchema({
  params: Joi.object().keys({
    templateId: requiredUUIDSchema(),
  }),
});

const deleteArchiveTemplateSchema = wrapSchema({
  params: Joi.object().keys({
    templateId: requiredUUIDSchema(),
  }),
});

const getTemplateByIdSchema = wrapSchema({
  params: Joi.object().keys({
    templateId: requiredUUIDSchema(),
  }),
});

const getTemplateSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTemplate: joiMiddleware(createTemplateSchema),
  editTemplate: joiMiddleware(editTemplateSchema),
  deleteTemplate: joiMiddleware(deleteTemplateSchema),
  deleteArchiveTemplate: joiMiddleware(deleteArchiveTemplateSchema),
  getTemplateById: joiMiddleware(getTemplateByIdSchema),
  getTemplates: joiMiddleware(getTemplateSchema),
};
