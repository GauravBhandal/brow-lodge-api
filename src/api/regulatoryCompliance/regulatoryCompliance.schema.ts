import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createRegulatoryComplianceSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    staff: requiredUUIDSchema(),
    title: Joi.string().required(),
    category: Joi.string().required(),
    notes: Joi.string().allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
    reviewDate: Joi.date().allow(null),
  }),
});

const editRegulatoryComplianceSchema = wrapSchema({
  params: Joi.object().keys({
    regulatoryComplianceId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    staff: requiredUUIDSchema(),
    title: Joi.string().required(),
    category: Joi.string().required(),
    notes: Joi.string().allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
    reviewDate: Joi.date().allow(null),
  }),
});

const deleteRegulatoryComplianceSchema = wrapSchema({
  params: Joi.object().keys({
    regulatoryComplianceId: requiredUUIDSchema(),
  }),
});

const getRegulatoryComplianceByIdSchema = wrapSchema({
  params: Joi.object().keys({
    regulatoryComplianceId: requiredUUIDSchema(),
  }),
});

const getRegulatoryComplianceSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createRegulatoryCompliance: joiMiddleware(createRegulatoryComplianceSchema),
  editRegulatoryCompliance: joiMiddleware(editRegulatoryComplianceSchema),
  deleteRegulatoryCompliance: joiMiddleware(deleteRegulatoryComplianceSchema),
  getRegulatoryComplianceById: joiMiddleware(getRegulatoryComplianceByIdSchema),
  getRegulatoryCompliances: joiMiddleware(getRegulatoryComplianceSchema),
};
