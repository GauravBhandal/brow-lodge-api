import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createRpdhsResourceSchema = wrapSchema({
  body: Joi.object().keys({
    nextReviewDate: Joi.date().allow(null),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editRpdhsResourceSchema = wrapSchema({
  params: Joi.object().keys({ rpdhsResourceId: requiredUUIDSchema() }),
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

const deleteRpdhsResourceSchema = wrapSchema({
  params: Joi.object().keys({
    rpdhsResourceId: requiredUUIDSchema(),
  }),
});

const getRpdhsResourceByIdSchema = wrapSchema({
  params: Joi.object().keys({
    rpdhsResourceId: requiredUUIDSchema(),
  }),
});

const getRpdhsResourceSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createRpdhsResource: joiMiddleware(createRpdhsResourceSchema),
  editRpdhsResource: joiMiddleware(editRpdhsResourceSchema),
  deleteRpdhsResource: joiMiddleware(deleteRpdhsResourceSchema),
  getRpdhsResourceById: joiMiddleware(getRpdhsResourceByIdSchema),
  getRpdhsResources: joiMiddleware(getRpdhsResourceSchema),
};
