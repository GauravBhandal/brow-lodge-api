import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createTintConsultationDetailSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    therapist: Joi.string().required().trim(),
    browColour: Joi.string().allow("", null),
    lashColour: Joi.string().allow("", null),
    overleafCondition: Joi.string().allow("", null),
    careGiven: Joi.string().allow("", null),
    clientSign: Joi.string().allow("", null),
    tint: requiredUUIDSchema(),
  }),
});

const editTintConsultationDetailSchema = wrapSchema({
  params: Joi.object().keys({ tintConsultationDetailId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    therapist: Joi.string().required().trim(),
    browColour: Joi.string().allow("", null),
    lashColour: Joi.string().allow("", null),
    overleafCondition: Joi.string().allow("", null),
    careGiven: Joi.string().allow("", null),
    clientSign: Joi.string().allow("", null),
    tint: requiredUUIDSchema(),
  }),
});

const deleteTintConsultationDetailSchema = wrapSchema({
  params: Joi.object().keys({
    tintConsultationDetailId: requiredUUIDSchema(),
  }),
});

const getTintConsultationDetailByIdSchema = wrapSchema({
  params: Joi.object().keys({
    tintConsultationDetailId: requiredUUIDSchema(),
  }),
});

const getTintConsultationDetailSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTintConsultationDetail: joiMiddleware(
    createTintConsultationDetailSchema
  ),
  editTintConsultationDetail: joiMiddleware(editTintConsultationDetailSchema),
  deleteTintConsultationDetail: joiMiddleware(
    deleteTintConsultationDetailSchema
  ),
  getTintConsultationDetailById: joiMiddleware(
    getTintConsultationDetailByIdSchema
  ),
  getTintConsultationDetails: joiMiddleware(getTintConsultationDetailSchema),
};
