import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createExpensesSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    totalExpense: Joi.number().required(),
    description: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
    paidBy: Joi.string().required(),
    status: Joi.string().valid("Approved", "Pending", "Rejected").required(),
    paymentReimbursed: Joi.string().required(),

  }),
});

const editExpensesSchema = wrapSchema({
  params: Joi.object().keys({ expensesId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow(null),
    totalExpense: Joi.number().required(),
    description: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
    paidBy: Joi.string().valid("Company", "Participant", "Staff").required(),
    status: Joi.string().valid("Approved", "Pending", "Rejected").required(),
    paymentReimbursed: Joi.string().valid("Yes", "No", "Not Applicable").required(),
    
  }),
});

const deleteExpensesSchema = wrapSchema({
  params: Joi.object().keys({
    expensesId: requiredUUIDSchema(),
  }),
});

const getExpensesByIdSchema = wrapSchema({
  params: Joi.object().keys({
    expensesId: requiredUUIDSchema(),
  }),
});

const getExpensesSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createExpenses: joiMiddleware(createExpensesSchema),
  editExpenses: joiMiddleware(editExpensesSchema),
  deleteExpenses: joiMiddleware(deleteExpensesSchema),
  getExpensesById: joiMiddleware(getExpensesByIdSchema),
  getExpensess: joiMiddleware(getExpensesSchema),
};
