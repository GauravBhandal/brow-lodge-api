import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createExpenseReimbursementSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalCost: Joi.number().required(),
    description: Joi.string().required(),
    comments: Joi.string().required().allow(""),
    status: Joi.string().valid("Approved", "Pending", "Rejected").required(),
    staff: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const editExpenseReimbursementSchema = wrapSchema({
  params: Joi.object().keys({ expenseReimbursementId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    totalCost: Joi.number().required(),
    description: Joi.string().required(),
    comments: Joi.string().required().allow(""),
    paymentStatus: Joi.string().required().allow("", null),
    status: Joi.string().valid("Approved", "Pending", "Rejected").required(),
    staff: requiredUUIDSchema(),
    attachments: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const deleteExpenseReimbursementSchema = wrapSchema({
  params: Joi.object().keys({
    expenseReimbursementId: requiredUUIDSchema(),
  }),
});

const getExpenseReimbursementByIdSchema = wrapSchema({
  params: Joi.object().keys({
    expenseReimbursementId: requiredUUIDSchema(),
  }),
});

const getExpenseReimbursementSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createExpenseReimbursement: joiMiddleware(createExpenseReimbursementSchema),
  editExpenseReimbursement: joiMiddleware(editExpenseReimbursementSchema),
  deleteExpenseReimbursement: joiMiddleware(deleteExpenseReimbursementSchema),
  getExpenseReimbursementById: joiMiddleware(getExpenseReimbursementByIdSchema),
  getExpenseReimbursements: joiMiddleware(getExpenseReimbursementSchema),
};
