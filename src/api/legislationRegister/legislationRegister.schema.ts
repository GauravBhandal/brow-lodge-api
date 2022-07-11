import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createLegislationRegisterSchema = wrapSchema({
  body: Joi.object().keys({
    reviewedOn: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    domain: Joi.string().required(),
    legislativeReference: Joi.string().required(),
    documentReference: Joi.string().required(),
    monitoringMechanism: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editLegislationRegisterSchema = wrapSchema({
  params: Joi.object().keys({ legislationRegisterId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    reviewedOn: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    domain: Joi.string().required(),
    legislativeReference: Joi.string().required(),
    documentReference: Joi.string().required(),
    monitoringMechanism: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteLegislationRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    legislationRegisterId: requiredUUIDSchema(),
  }),
});

const getLegislationRegisterByIdSchema = wrapSchema({
  params: Joi.object().keys({
    legislationRegisterId: requiredUUIDSchema(),
  }),
});

const getLegislationRegisterSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createLegislationRegister: joiMiddleware(createLegislationRegisterSchema),
  editLegislationRegister: joiMiddleware(editLegislationRegisterSchema),
  deleteLegislationRegister: joiMiddleware(deleteLegislationRegisterSchema),
  getLegislationRegisterById: joiMiddleware(getLegislationRegisterByIdSchema),
  getLegislationRegisters: joiMiddleware(getLegislationRegisterSchema),
};
