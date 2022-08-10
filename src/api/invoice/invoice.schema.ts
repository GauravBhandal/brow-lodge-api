import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createInvoiceSchema = wrapSchema({
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    status: Joi.string().required(),
    shift: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editInvoiceSchema = wrapSchema({
  params: Joi.object().keys({ invoiceId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    status: Joi.string().required(),
    shift: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const updateInvoiceStatusSchema = wrapSchema({
  body: Joi.object().keys({
    status: Joi.string().required(),
    lastExportedOn: Joi.date().allow(null),
    ids: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const generateInvoicesSchema = wrapSchema({
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const setExportedOnInvoicesSchema = wrapSchema({
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const deleteInvoiceSchema = wrapSchema({
  params: Joi.object().keys({
    invoiceId: requiredUUIDSchema(),
  }),
});

const getInvoiceByIdSchema = wrapSchema({
  params: Joi.object().keys({
    invoiceId: requiredUUIDSchema(),
  }),
});

const getInvoiceSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createInvoice: joiMiddleware(createInvoiceSchema),
  editInvoice: joiMiddleware(editInvoiceSchema),
  updateInvoiceStatus: joiMiddleware(updateInvoiceStatusSchema),
  generateInvoices: joiMiddleware(generateInvoicesSchema),
  deleteInvoice: joiMiddleware(deleteInvoiceSchema),
  getInvoiceById: joiMiddleware(getInvoiceByIdSchema),
  getInvoices: joiMiddleware(getInvoiceSchema),
  setExportedOnInvoices: joiMiddleware(setExportedOnInvoicesSchema),
};
