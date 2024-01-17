import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createTintConsultationSchema = wrapSchema({
  body: Joi.object().keys({
    doctorName: Joi.string().required().trim(),
    technicianName: Joi.string().required().trim(),
    doctorAddress: Joi.string().required().trim(),
    colourEyebrow: Joi.string().allow("", null),
    colourEyelash: Joi.string().allow("", null),
    skinPatchTest: Joi.boolean().allow(null),
    skinPatchTestDate: Joi.date().allow("", null),
    clientSign: Joi.string().allow("", null),
    disease: Joi.array().items(Joi.string()).allow("", null),
    date: Joi.date().required(),
    client: requiredUUIDSchema(),
  }),
});

const editTintConsultationSchema = wrapSchema({
  params: Joi.object().keys({ tintConsultationId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    doctorName: Joi.string().required().trim(),
    technicianName: Joi.string().required().trim(),
    doctorAddress: Joi.string().required().trim(),
    colourEyebrow: Joi.string().allow("", null),
    colourEyelash: Joi.string().allow("", null),
    skinPatchTest: Joi.boolean().allow(null),
    skinPatchTestDate: Joi.date().allow("", null),
    clientSign: Joi.string().allow("", null),
    disease: Joi.array().items(Joi.string()).allow("", null),
    date: Joi.date().required(),
    client: requiredUUIDSchema(),
  }),
});

const deleteTintConsultationSchema = wrapSchema({
  params: Joi.object().keys({
    tintConsultationId: requiredUUIDSchema(),
  }),
});

const getTintConsultationByIdSchema = wrapSchema({
  params: Joi.object().keys({
    tintConsultationId: requiredUUIDSchema(),
  }),
});

const getTintConsultationSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTintConsultation: joiMiddleware(createTintConsultationSchema),
  editTintConsultation: joiMiddleware(editTintConsultationSchema),
  deleteTintConsultation: joiMiddleware(deleteTintConsultationSchema),
  getTintConsultationById: joiMiddleware(getTintConsultationByIdSchema),
  getTintConsultations: joiMiddleware(getTintConsultationSchema),
};
