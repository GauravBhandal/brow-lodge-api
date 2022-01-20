import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createCorporateRiskSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    levelOfRisk: Joi.string().required(),
    likelihood: Joi.string().required(),
    consequences: Joi.string().required(),
    riskDescription: Joi.string().required(),
    mitigationStrategy: Joi.string().required(),
    monitoringStrategy: Joi.string().required(),
    staff: requiredUUIDSchema(),
  }),
});

const editCorporateRiskSchema = wrapSchema({
  params: Joi.object().keys({ corporateRiskId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    levelOfRisk: Joi.string().required(),
    likelihood: Joi.string().required(),
    consequences: Joi.string().required(),
    riskDescription: Joi.string().required(),
    mitigationStrategy: Joi.string().required(),
    monitoringStrategy: Joi.string().required(),
    staff: requiredUUIDSchema(),
  }),
});

const deleteCorporateRiskSchema = wrapSchema({
  params: Joi.object().keys({
    corporateRiskId: requiredUUIDSchema(),
  }),
});

const getCorporateRiskByIdSchema = wrapSchema({
  params: Joi.object().keys({
    corporateRiskId: requiredUUIDSchema(),
  }),
});

const getCorporateRiskSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createCorporateRisk: joiMiddleware(createCorporateRiskSchema),
  editCorporateRisk: joiMiddleware(editCorporateRiskSchema),
  deleteCorporateRisk: joiMiddleware(deleteCorporateRiskSchema),
  getCorporateRiskById: joiMiddleware(getCorporateRiskByIdSchema),
  getCorporateRisks: joiMiddleware(getCorporateRiskSchema),
};
