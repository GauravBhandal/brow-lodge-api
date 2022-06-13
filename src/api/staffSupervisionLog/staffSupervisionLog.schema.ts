import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredTimeSchema,
  requiredUUIDSchema,
  wrapSchema,
} from "../../common/joiSchemas";

const createStaffSupervisionLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextDueOn: Joi.date().required(),
    type: Joi.string().required(),
    notes: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editStaffSupervisionLogSchema = wrapSchema({
  params: Joi.object().keys({
    staffSupervisionLogId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextDueOn: Joi.date().required(),
    type: Joi.string().required(),
    notes: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteStaffSupervisionLogSchema = wrapSchema({
  params: Joi.object().keys({
    staffSupervisionLogId: requiredUUIDSchema(),
  }),
});

const getStaffSupervisionLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    staffSupervisionLogId: requiredUUIDSchema(),
  }),
});

const getStaffSupervisionLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createStaffSupervisionLog: joiMiddleware(createStaffSupervisionLogSchema),
  editStaffSupervisionLog: joiMiddleware(editStaffSupervisionLogSchema),
  deleteStaffSupervisionLog: joiMiddleware(deleteStaffSupervisionLogSchema),
  getStaffSupervisionLogById: joiMiddleware(getStaffSupervisionLogByIdSchema),
  getStaffSupervisionLogs: joiMiddleware(getStaffSupervisionLogSchema),
};
