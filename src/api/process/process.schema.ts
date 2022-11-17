import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createProcessSchema = wrapSchema({
  body: Joi.object().keys({
    nextReviewDate: Joi.date().allow(null),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editProcessSchema = wrapSchema({
  params: Joi.object().keys({ processId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    nextReviewDate: Joi.date().allow(null),
    name: Joi.string().required(),
    version: Joi.string().required(),
    archived: Joi.boolean(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteProcessSchema = wrapSchema({
  params: Joi.object().keys({
    processId: requiredUUIDSchema(),
  }),
});

const getProcessByIdSchema = wrapSchema({
  params: Joi.object().keys({
    processId: requiredUUIDSchema(),
  }),
});

const getProcessSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createProcess: joiMiddleware(createProcessSchema),
  editProcess: joiMiddleware(editProcessSchema),
  deleteProcess: joiMiddleware(deleteProcessSchema),
  getProcessById: joiMiddleware(getProcessByIdSchema),
  getProcesses: joiMiddleware(getProcessSchema),
};
