import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createInternalRegisterSchema = wrapSchema({
  body: Joi.object().keys({
    notes: Joi.string().allow("", null),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editInternalRegisterSchema = wrapSchema({
  params: Joi.object().keys({ internalRegisterId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    notes: Joi.string().allow("", null),
    name: Joi.string().required(),
    version: Joi.string().required(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteInternalRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    internalRegisterId: requiredUUIDSchema(),
  }),
});

const getInternalRegisterByIdSchema = wrapSchema({
  params: Joi.object().keys({
    internalRegisterId: requiredUUIDSchema(),
  }),
});

const getInternalRegisterSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createInternalRegister: joiMiddleware(createInternalRegisterSchema),
  editInternalRegister: joiMiddleware(editInternalRegisterSchema),
  deleteInternalRegister: joiMiddleware(deleteInternalRegisterSchema),
  getInternalRegisterById: joiMiddleware(getInternalRegisterByIdSchema),
  getInternalRegisters: joiMiddleware(getInternalRegisterSchema),
};
