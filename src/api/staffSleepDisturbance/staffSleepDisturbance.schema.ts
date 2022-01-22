import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createStaffSleepDisturbanceSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    totalHours: Joi.number().required(),
    description: Joi.string().required(),
    actions: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editStaffSleepDisturbanceSchema = wrapSchema({
  params: Joi.object().keys({ staffSleepDisturbanceId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    totalHours: Joi.number().required(),
    description: Joi.string().required(),
    actions: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteStaffSleepDisturbanceSchema = wrapSchema({
  params: Joi.object().keys({
    staffSleepDisturbanceId: requiredUUIDSchema(),
  }),
});

const getStaffSleepDisturbanceByIdSchema = wrapSchema({
  params: Joi.object().keys({
    staffSleepDisturbanceId: requiredUUIDSchema(),
  }),
});

const getStaffSleepDisturbanceSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createStaffSleepDisturbance: joiMiddleware(createStaffSleepDisturbanceSchema),
  editStaffSleepDisturbance: joiMiddleware(editStaffSleepDisturbanceSchema),
  deleteStaffSleepDisturbance: joiMiddleware(deleteStaffSleepDisturbanceSchema),
  getStaffSleepDisturbanceById: joiMiddleware(
    getStaffSleepDisturbanceByIdSchema
  ),
  getStaffSleepDisturbances: joiMiddleware(getStaffSleepDisturbanceSchema),
};
