import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createDoctorVisitSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    doctorName: Joi.string().required(),
    healthPractitioner: Joi.string().required(),
    reasonForVisit: Joi.string().required(),
    doctorInstructions: Joi.string().required(),
    location: Joi.string().required().allow(""),
    appointmentType: Joi.string().required().allow(""),
    nextAppointmentDate: Joi.string().required().allow(""),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editDoctorVisitSchema = wrapSchema({
  params: Joi.object().keys({ doctorVisitId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    doctorName: Joi.string().required(),
    healthPractitioner: Joi.string().required(),
    reasonForVisit: Joi.string().required(),
    doctorInstructions: Joi.string().required(),
    location: Joi.string().required().allow(""),
    appointmentType: Joi.string().required().allow(""),
    nextAppointmentDate: Joi.string().required().allow(""),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteDoctorVisitSchema = wrapSchema({
  params: Joi.object().keys({
    doctorVisitId: requiredUUIDSchema(),
  }),
});

const getDoctorVisitByIdSchema = wrapSchema({
  params: Joi.object().keys({
    doctorVisitId: requiredUUIDSchema(),
  }),
});

const getDoctorVisitSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createDoctorVisit: joiMiddleware(createDoctorVisitSchema),
  editDoctorVisit: joiMiddleware(editDoctorVisitSchema),
  deleteDoctorVisit: joiMiddleware(deleteDoctorVisitSchema),
  getDoctorVisitById: joiMiddleware(getDoctorVisitByIdSchema),
  getDoctorVisits: joiMiddleware(getDoctorVisitSchema),
};