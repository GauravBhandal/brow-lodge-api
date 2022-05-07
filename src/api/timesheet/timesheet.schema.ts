import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createTimesheetSchema = wrapSchema({
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    status: Joi.string().required(),
    shift: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const editTimesheetSchema = wrapSchema({
  params: Joi.object().keys({ timesheetId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    status: Joi.string().required(),
    shift: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const updateTimesheetStatusSchema = wrapSchema({
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

const deleteTimesheetSchema = wrapSchema({
  params: Joi.object().keys({
    timesheetId: requiredUUIDSchema(),
  }),
});

const getTimesheetByIdSchema = wrapSchema({
  params: Joi.object().keys({
    timesheetId: requiredUUIDSchema(),
  }),
});

const getTimesheetSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTimesheet: joiMiddleware(createTimesheetSchema),
  editTimesheet: joiMiddleware(editTimesheetSchema),
  updateTimesheetStatus: joiMiddleware(updateTimesheetStatusSchema),
  generateInvoices: joiMiddleware(generateInvoicesSchema),
  deleteTimesheet: joiMiddleware(deleteTimesheetSchema),
  getTimesheetById: joiMiddleware(getTimesheetByIdSchema),
  getTimesheets: joiMiddleware(getTimesheetSchema),
};
