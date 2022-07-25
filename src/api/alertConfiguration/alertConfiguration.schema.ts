import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createAlertConfigurationSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow("", null),
    permissions: Joi.object(),
  }),
});

const editAlertConfigurationSchema = wrapSchema({
  params: Joi.object().keys({
    alertConfigurationId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow("", null),
    permissions: Joi.object(),
  }),
});

const deleteAlertConfigurationSchema = wrapSchema({
  params: Joi.object().keys({
    alertConfigurationId: requiredUUIDSchema(),
  }),
});

const getAlertConfigurationByIdSchema = wrapSchema({
  params: Joi.object().keys({
    alertConfigurationId: requiredUUIDSchema(),
  }),
});

const getAlertConfigurationSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createAlertConfiguration: joiMiddleware(createAlertConfigurationSchema),
  editAlertConfiguration: joiMiddleware(editAlertConfigurationSchema),
  deleteAlertConfiguration: joiMiddleware(deleteAlertConfigurationSchema),
  getAlertConfigurationById: joiMiddleware(getAlertConfigurationByIdSchema),
  getAlertConfigurations: joiMiddleware(getAlertConfigurationSchema),
};
