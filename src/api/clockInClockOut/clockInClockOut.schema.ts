import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClockInClockOutSchema = wrapSchema({
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().allow("", null),
    checkInLocation: Joi.string().required(),
    checkOutLocation: Joi.string().allow("", null),
    checkInAttachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    checkIOutAttachment: Joi.string()
      .uuid({ version: "uuidv4" })
      .allow("", null),
    shift: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const editClockInClockOutSchema = wrapSchema({
  params: Joi.object().keys({ clockInClockOutId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().allow("", null),
    checkInLocation: Joi.string().required(),
    checkOutLocation: Joi.string().allow("", null),
    checkInAttachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    checkIOutAttachment: Joi.string()
      .uuid({ version: "uuidv4" })
      .allow("", null),
    shift: requiredUUIDSchema(),
    staff: requiredUUIDSchema(),
  }),
});

const deleteClockInClockOutSchema = wrapSchema({
  params: Joi.object().keys({
    clockInClockOutId: requiredUUIDSchema(),
  }),
});

const getClockInClockOutByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clockInClockOutId: requiredUUIDSchema(),
  }),
});

const getClockInClockOutSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClockInClockOut: joiMiddleware(createClockInClockOutSchema),
  editClockInClockOut: joiMiddleware(editClockInClockOutSchema),
  deleteClockInClockOut: joiMiddleware(deleteClockInClockOutSchema),
  getClockInClockOutById: joiMiddleware(getClockInClockOutByIdSchema),
  getClockInClockOuts: joiMiddleware(getClockInClockOutSchema),
};
