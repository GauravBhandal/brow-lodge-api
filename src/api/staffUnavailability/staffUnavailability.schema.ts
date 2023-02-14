import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const serviceSchema = Joi.object().keys({
  startTime: Joi.date().required(),
  service: requiredUUIDSchema(),
});

// TODO: Add meta
const staffUnavailabilityRepeatSchema = Joi.object()
  .allow(null)
  .keys({
    frequency: Joi.string().valid("daily", "weekly").allow(null),
    every: Joi.number().min(1).allow(null),
    occurrences: Joi.number().min(1).allow(null),
    repeatEndDate: Joi.date().allow(null),
    days: Joi.array(),
  });

const createStaffUnavailabilitySchema = wrapSchema({
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date()
      .required()
      .greater(Joi.ref("startDateTime"))
      .message("Staff unavailable start time must be greater than end time"),
    staff: requiredUUIDSchema(),
    repeat: staffUnavailabilityRepeatSchema,
  }),
});

const deleteStaffUnavailabilitySchema = wrapSchema({
  params: Joi.object().keys({
    staffUnavailabilityId: requiredUUIDSchema(),
  }),
});

const getStaffUnavailabilityByIdSchema = wrapSchema({
  params: Joi.object().keys({
    staffUnavailabilityId: requiredUUIDSchema(),
  }),
});

const getStaffUnavailabilitySchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createStaffUnavailability: joiMiddleware(createStaffUnavailabilitySchema),
  deleteStaffUnavailability: joiMiddleware(deleteStaffUnavailabilitySchema),
  getStaffUnavailabilityById: joiMiddleware(getStaffUnavailabilityByIdSchema),
  getStaffUnavailabilitys: joiMiddleware(getStaffUnavailabilitySchema),
};
