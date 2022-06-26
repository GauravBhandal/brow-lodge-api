import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientAssetSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    assetName: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editClientAssetSchema = wrapSchema({
  params: Joi.object().keys({ clientAssetId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    assetName: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteClientAssetSchema = wrapSchema({
  params: Joi.object().keys({
    clientAssetId: requiredUUIDSchema(),
  }),
});

const getClientAssetByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientAssetId: requiredUUIDSchema(),
  }),
});

const getClientAssetSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientAsset: joiMiddleware(createClientAssetSchema),
  editClientAsset: joiMiddleware(editClientAssetSchema),
  deleteClientAsset: joiMiddleware(deleteClientAssetSchema),
  getClientAssetById: joiMiddleware(getClientAssetByIdSchema),
  getClientAssets: joiMiddleware(getClientAssetSchema),
};
