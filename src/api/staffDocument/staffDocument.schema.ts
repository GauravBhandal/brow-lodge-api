import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createStaffDocumentSchema = wrapSchema({
  body: Joi.object().keys({
    comments: Joi.string().allow("", null),
    hasExpiry: Joi.boolean().required(),
    expiryDate: Joi.date().allow(null),
    staff: requiredUUIDSchema(),
    category: requiredUUIDSchema(),
    type: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const editStaffDocumentSchema = wrapSchema({
  params: Joi.object().keys({ staffDocumentId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    comments: Joi.string().allow("", null),
    hasExpiry: Joi.boolean().required(),
    expiryDate: Joi.date().allow(null),
    staff: requiredUUIDSchema(),
    category: requiredUUIDSchema(),
    type: requiredUUIDSchema(),
    archived: Joi.boolean(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow(null),
  }),
});

const deleteStaffDocumentSchema = wrapSchema({
  params: Joi.object().keys({
    staffDocumentId: requiredUUIDSchema(),
  }),
});

const getStaffDocumentByIdSchema = wrapSchema({
  params: Joi.object().keys({
    staffDocumentId: requiredUUIDSchema(),
  }),
});

const getStaffDocumentSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createStaffDocument: joiMiddleware(createStaffDocumentSchema),
  editStaffDocument: joiMiddleware(editStaffDocumentSchema),
  deleteStaffDocument: joiMiddleware(deleteStaffDocumentSchema),
  getStaffDocumentById: joiMiddleware(getStaffDocumentByIdSchema),
  getStaffDocuments: joiMiddleware(getStaffDocumentSchema),
};
