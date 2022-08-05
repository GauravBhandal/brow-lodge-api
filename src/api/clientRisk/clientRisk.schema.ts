import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientRiskSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    levelOfRisk: Joi.string().required(),
    likelihood: Joi.string().required(),
    consequences: Joi.string().required(),
    riskDescription: Joi.string().required(),
    mitigationStrategy: Joi.string().required(),
    monitoringStrategy: Joi.string().required(),
    assessmentType: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editClientRiskSchema = wrapSchema({
  params: Joi.object().keys({ clientRiskId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    levelOfRisk: Joi.string().required(),
    likelihood: Joi.string().required(),
    consequences: Joi.string().required(),
    riskDescription: Joi.string().required(),
    mitigationStrategy: Joi.string().required(),
    monitoringStrategy: Joi.string().required(),
    assessmentType: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteClientRiskSchema = wrapSchema({
  params: Joi.object().keys({
    clientRiskId: requiredUUIDSchema(),
  }),
});

const getClientRiskByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientRiskId: requiredUUIDSchema(),
  }),
});

const getClientRiskSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientRisk: joiMiddleware(createClientRiskSchema),
  editClientRisk: joiMiddleware(editClientRiskSchema),
  deleteClientRisk: joiMiddleware(deleteClientRiskSchema),
  getClientRiskById: joiMiddleware(getClientRiskByIdSchema),
  getClientRisks: joiMiddleware(getClientRiskSchema),
};
