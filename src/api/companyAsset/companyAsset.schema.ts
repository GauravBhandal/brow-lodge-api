import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createCompanyAssetSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    assetName: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editCompanyAssetSchema = wrapSchema({
  params: Joi.object().keys({ companyAssetId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    assetName: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteCompanyAssetSchema = wrapSchema({
  params: Joi.object().keys({
    companyAssetId: requiredUUIDSchema(),
  }),
});

const deleteArchiveCompanyAssetSchema = wrapSchema({
  params: Joi.object().keys({
    companyAssetId: requiredUUIDSchema(),
  }),
});

const getCompanyAssetByIdSchema = wrapSchema({
  params: Joi.object().keys({
    companyAssetId: requiredUUIDSchema(),
  }),
});

const getCompanyAssetSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createCompanyAsset: joiMiddleware(createCompanyAssetSchema),
  editCompanyAsset: joiMiddleware(editCompanyAssetSchema),
  deleteCompanyAsset: joiMiddleware(deleteCompanyAssetSchema),
  deleteArchiveCompanyAsset: joiMiddleware(deleteArchiveCompanyAssetSchema),
  getCompanyAssetById: joiMiddleware(getCompanyAssetByIdSchema),
  getCompanyAssets: joiMiddleware(getCompanyAssetSchema),
};
