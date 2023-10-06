import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createSiteSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    address: Joi.string().required().trim(),
    numberOfEmployee: Joi.number().required(),
  }),
});

const editSiteSchema = wrapSchema({
  params: Joi.object().keys({ siteId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    address: Joi.string().required().trim(),
    numberOfEmployee: Joi.number().required(),
  }),
});

const deleteSiteSchema = wrapSchema({
  params: Joi.object().keys({
    siteId: requiredUUIDSchema(),
  }),
});

const getSiteByIdSchema = wrapSchema({
  params: Joi.object().keys({
    siteId: requiredUUIDSchema(),
  }),
});

const getSiteSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createSite: joiMiddleware(createSiteSchema),
  editSite: joiMiddleware(editSiteSchema),
  deleteSite: joiMiddleware(deleteSiteSchema),
  getSiteById: joiMiddleware(getSiteByIdSchema),
  getSites: joiMiddleware(getSiteSchema),
};
