import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createShiftTypeSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
  }),
});

const editShiftTypeSchema = wrapSchema({
  params: Joi.object().keys({ shiftTypeId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
  }),
});

const deleteShiftTypeSchema = wrapSchema({
  params: Joi.object().keys({
    shiftTypeId: requiredUUIDSchema(),
  }),
});

const getShiftTypeByIdSchema = wrapSchema({
  params: Joi.object().keys({
    shiftTypeId: requiredUUIDSchema(),
  }),
});

const getShiftTypeSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createShiftType: joiMiddleware(createShiftTypeSchema),
  editShiftType: joiMiddleware(editShiftTypeSchema),
  deleteShiftType: joiMiddleware(deleteShiftTypeSchema),
  getShiftTypeById: joiMiddleware(getShiftTypeByIdSchema),
  getShiftTypes: joiMiddleware(getShiftTypeSchema),
};
