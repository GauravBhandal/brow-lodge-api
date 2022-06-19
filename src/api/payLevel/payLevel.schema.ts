import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createPayLevelSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
  }),
});

const editPayLevelSchema = wrapSchema({
  params: Joi.object().keys({ payLevelId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
  }),
});

const deletePayLevelSchema = wrapSchema({
  params: Joi.object().keys({
    payLevelId: requiredUUIDSchema(),
  }),
});

const getPayLevelByIdSchema = wrapSchema({
  params: Joi.object().keys({
    payLevelId: requiredUUIDSchema(),
  }),
});

const getPayLevelSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createPayLevel: joiMiddleware(createPayLevelSchema),
  editPayLevel: joiMiddleware(editPayLevelSchema),
  deletePayLevel: joiMiddleware(deletePayLevelSchema),
  getPayLevelById: joiMiddleware(getPayLevelByIdSchema),
  getPayLevels: joiMiddleware(getPayLevelSchema),
};
