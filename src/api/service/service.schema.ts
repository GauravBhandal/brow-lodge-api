import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createServiceSchema = wrapSchema({
  body: Joi.object().keys({
    code: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    effectiveDate: Joi.date().allow(null),
    rateType: Joi.string().required().trim(),
    archived: Joi.boolean().required(),
  }),
});

const editServiceSchema = wrapSchema({
  params: Joi.object().keys({ serviceId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    code: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    effectiveDate: Joi.date().allow(null),
    archived: Joi.boolean().required(),
    rateType: Joi.string().required().trim(),
  }),
});

const deleteServiceSchema = wrapSchema({
  params: Joi.object().keys({
    serviceId: requiredUUIDSchema(),
  }),
});

const getServiceByIdSchema = wrapSchema({
  params: Joi.object().keys({
    serviceId: requiredUUIDSchema(),
  }),
});

const getServiceSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

const updatePayItems = wrapSchema({
  body: Joi.object().keys({
    payitems: Joi.array()
      .items(
        Joi.object().keys({
          paylevel: requiredUUIDSchema(),
          service: requiredUUIDSchema(),
          payitem: requiredUUIDSchema(),
        })
      )
      .required(),
  }),
});

export default {
  createService: joiMiddleware(createServiceSchema),
  editService: joiMiddleware(editServiceSchema),
  deleteService: joiMiddleware(deleteServiceSchema),
  getServiceById: joiMiddleware(getServiceByIdSchema),
  getServices: joiMiddleware(getServiceSchema),
  updatePayItems: joiMiddleware(updatePayItems),
};
