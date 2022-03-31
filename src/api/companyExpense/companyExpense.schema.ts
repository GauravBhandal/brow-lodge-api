import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createCompanyExpenseSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalCost: Joi.number().required(),
    description: Joi.string().required(),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editCompanyExpenseSchema = wrapSchema({
  params: Joi.object().keys({ companyExpenseId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalCost: Joi.number().required(),
    description: Joi.string().required(),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteCompanyExpenseSchema = wrapSchema({
  params: Joi.object().keys({
    companyExpenseId: requiredUUIDSchema(),
  }),
});

const getCompanyExpenseByIdSchema = wrapSchema({
  params: Joi.object().keys({
    companyExpenseId: requiredUUIDSchema(),
  }),
});

const getCompanyExpenseSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createCompanyExpense: joiMiddleware(createCompanyExpenseSchema),
  editCompanyExpense: joiMiddleware(editCompanyExpenseSchema),
  deleteCompanyExpense: joiMiddleware(deleteCompanyExpenseSchema),
  getCompanyExpenseById: joiMiddleware(getCompanyExpenseByIdSchema),
  getCompanyExpenses: joiMiddleware(getCompanyExpenseSchema),
};
