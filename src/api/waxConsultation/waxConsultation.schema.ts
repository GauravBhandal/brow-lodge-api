import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createWaxConsultationSchema = wrapSchema({
  body: Joi.object().keys({
    doctorName: Joi.string().required().trim(),
    doctorAddress: Joi.string().required().trim(),
    waxTreatment: Joi.boolean().required(),
    clientSign: Joi.string().allow("", null),
    prescribedMedicine: Joi.string().allow("", null),
    containProducts: Joi.array().items(Joi.string()).allow("", null),
    disease: Joi.array().items(Joi.string()).allow("", null),
    date: Joi.date().required(),
    client: requiredUUIDSchema(),
  }),
});

const editWaxConsultationSchema = wrapSchema({
  params: Joi.object().keys({ waxConsultationId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    doctorName: Joi.string().required().trim(),
    doctorAddress: Joi.string().required().trim(),
    clientSign: Joi.string().allow("", null),
    prescribedMedicine: Joi.string().allow("", null),
    waxTreatment: Joi.boolean().required(),
    containProducts: Joi.array().items(Joi.string()).allow("", null),
    disease: Joi.array().items(Joi.string()).allow("", null),
    date: Joi.date().required(),
    client: requiredUUIDSchema(),
  }),
});

const deleteWaxConsultationSchema = wrapSchema({
  params: Joi.object().keys({
    waxConsultationId: requiredUUIDSchema(),
  }),
});

const getWaxConsultationByIdSchema = wrapSchema({
  params: Joi.object().keys({
    waxConsultationId: requiredUUIDSchema(),
  }),
});

const getWaxConsultationSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createWaxConsultation: joiMiddleware(createWaxConsultationSchema),
  editWaxConsultation: joiMiddleware(editWaxConsultationSchema),
  deleteWaxConsultation: joiMiddleware(deleteWaxConsultationSchema),
  getWaxConsultationById: joiMiddleware(getWaxConsultationByIdSchema),
  getWaxConsultations: joiMiddleware(getWaxConsultationSchema),
};
