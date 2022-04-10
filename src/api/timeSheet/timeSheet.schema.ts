import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createTimeSheetSchema = wrapSchema({
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    status: Joi.string().required(),
    shift: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const editTimeSheetSchema = wrapSchema({
  params: Joi.object().keys({ timeSheetId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    status: Joi.string().required(),
    shift: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const updateTimeSheetStatusSchema = wrapSchema({
  body: Joi.object().keys({
    status: Joi.string().required(),
    ids: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
  }),
});

const deleteTimeSheetSchema = wrapSchema({
  params: Joi.object().keys({
    timeSheetId: requiredUUIDSchema(),
  }),
});

const getTimeSheetByIdSchema = wrapSchema({
  params: Joi.object().keys({
    timeSheetId: requiredUUIDSchema(),
  }),
});

const getTimeSheetSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTimeSheet: joiMiddleware(createTimeSheetSchema),
  editTimeSheet: joiMiddleware(editTimeSheetSchema),
  updateTimeSheetStatus: joiMiddleware(updateTimeSheetStatusSchema),
  deleteTimeSheet: joiMiddleware(deleteTimeSheetSchema),
  getTimeSheetById: joiMiddleware(getTimeSheetByIdSchema),
  getTimeSheets: joiMiddleware(getTimeSheetSchema),
};
