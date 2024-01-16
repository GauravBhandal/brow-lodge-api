import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createWaxConsultationDetailSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    therapist: Joi.string().allow("", null),
    skinBefore: Joi.string().allow("", null),
    treatment: Joi.string().allow("", null),
    skinAfter: Joi.string().allow("", null),
    careGiven: Joi.string().allow("", null),
    clientSign: Joi.string().allow("", null),
    wax: requiredUUIDSchema(),
  }),
});

const editWaxConsultationDetailSchema = wrapSchema({
  params: Joi.object().keys({ waxConsultationDetailId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    therapist: Joi.string().allow("", null),
    skinBefore: Joi.string().allow("", null),
    treatment: Joi.string().allow("", null),
    skinAfter: Joi.string().allow("", null),
    careGiven: Joi.string().allow("", null),
    clientSign: Joi.string().allow("", null),
    wax: requiredUUIDSchema(),
  }),
});

const deleteWaxConsultationDetailSchema = wrapSchema({
  params: Joi.object().keys({
    waxConsultationDetailId: requiredUUIDSchema(),
  }),
});

const getWaxConsultationDetailByIdSchema = wrapSchema({
  params: Joi.object().keys({
    waxConsultationDetailId: requiredUUIDSchema(),
  }),
});

const getWaxConsultationDetailSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createWaxConsultationDetail: joiMiddleware(
    createWaxConsultationDetailSchema
  ),
  editWaxConsultationDetail: joiMiddleware(editWaxConsultationDetailSchema),
  deleteWaxConsultationDetail: joiMiddleware(
    deleteWaxConsultationDetailSchema
  ),
  getWaxConsultationDetailById: joiMiddleware(
    getWaxConsultationDetailByIdSchema
  ),
  getWaxConsultationDetails: joiMiddleware(getWaxConsultationDetailSchema),
};
