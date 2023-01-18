import Joi from "joi";
import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createSiteSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    location: Joi.string().required(),
    client: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const editSiteSchema = wrapSchema({
  params: Joi.object().keys({ siteId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    location: Joi.string().required(),
    client: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
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

const getSiteClientProfilesSchema = wrapSchema({
  query: Joi.object().keys({
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
  getSiteClientProfiles: joiMiddleware(getSiteClientProfilesSchema),
};
