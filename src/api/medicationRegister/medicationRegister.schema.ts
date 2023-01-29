import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createMedicationRegisterSchema = wrapSchema({
  body: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    medicationName: Joi.string().required(),
    administrationType: Joi.string().required(),
    dosage: Joi.string().required(),
    frequency: Joi.string().required(),
    isPrescribed: Joi.string().allow(null),
    notes: Joi.string().allow("", null),
    nextReviewDate: Joi.date().allow(null),
  }),
});

const editMedicationRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    medicationRegisterId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    medicationName: Joi.string().required(),
    administrationType: Joi.string().required(),
    dosage: Joi.string().required(),
    frequency: Joi.string().required(),
    isPrescribed: Joi.string().allow(null),
    notes: Joi.string().allow("", null),
    nextReviewDate: Joi.date().allow(null),
  }),
});

const deleteMedicationRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    medicationRegisterId: requiredUUIDSchema(),
  }),
});

const deleteArchiveMedicationRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    medicationRegisterId: requiredUUIDSchema(),
  }),
});

const getMedicationRegisterByIdSchema = wrapSchema({
  params: Joi.object().keys({
    medicationRegisterId: requiredUUIDSchema(),
  }),
});

const getMedicationRegisterSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createMedicationRegister: joiMiddleware(createMedicationRegisterSchema),
  editMedicationRegister: joiMiddleware(editMedicationRegisterSchema),
  deleteMedicationRegister: joiMiddleware(deleteMedicationRegisterSchema),
  deleteArchiveMedicationRegister: joiMiddleware(
    deleteArchiveMedicationRegisterSchema
  ),
  getMedicationRegisterById: joiMiddleware(getMedicationRegisterByIdSchema),
  getMedicationRegisters: joiMiddleware(getMedicationRegisterSchema),
};
