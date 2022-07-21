import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createServiceDeliverySchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
      .required(),
    endTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
      .required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    service: requiredUUIDSchema(),
    notes: Joi.string().required(),
    claimType: Joi.string().required().allow(""),
  }),
});

const editServiceDeliverySchema = wrapSchema({
  params: Joi.object().keys({ serviceDeliveryId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
      .required(),
    endTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
      .required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    service: requiredUUIDSchema(),
    notes: Joi.string().required(),
    claimType: Joi.string().required().allow(""),
  }),
});

const deleteServiceDeliverySchema = wrapSchema({
  params: Joi.object().keys({
    serviceDeliveryId: requiredUUIDSchema(),
  }),
});

const getServiceDeliveryByIdSchema = wrapSchema({
  params: Joi.object().keys({
    serviceDeliveryId: requiredUUIDSchema(),
  }),
});

const getServiceDeliverySchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createServiceDelivery: joiMiddleware(createServiceDeliverySchema),
  editServiceDelivery: joiMiddleware(editServiceDeliverySchema),
  deleteServiceDelivery: joiMiddleware(deleteServiceDeliverySchema),
  getServiceDeliveryById: joiMiddleware(getServiceDeliveryByIdSchema),
  getServiceDeliveries: joiMiddleware(getServiceDeliverySchema),
};
