import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createCompanySchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const editCompanySchema = wrapSchema({
  params: Joi.object().keys({
    companyId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const getCompanyByIdSchema = wrapSchema({
  params: Joi.object().keys({
    companyId: requiredUUIDSchema(),
  }),
});

export default {
  createCompany: joiMiddleware(createCompanySchema),
  editCompany: joiMiddleware(editCompanySchema),
  getCompanyById: joiMiddleware(getCompanyByIdSchema),
};
