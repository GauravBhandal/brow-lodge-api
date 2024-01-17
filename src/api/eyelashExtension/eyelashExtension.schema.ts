import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createEyelashExtensionSchema = wrapSchema({
  body: Joi.object().keys({
    technicianName: Joi.string().required().trim(),
    doctorName: Joi.string().required().trim(),
    doctorAddress: Joi.string().required().trim(),
    clientSign: Joi.string().required().trim(),
    isPregnant: Joi.boolean().allow(null),
    eyeSyndrome: Joi.boolean().allow(null),
    hrt: Joi.boolean().allow(null),
    eyeComplaint: Joi.boolean().allow(null),
    skinPatchTest: Joi.boolean().allow(null),
    date: Joi.date().required(),
    skinPatchTestDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
  }),
});

const editEyelashExtensionSchema = wrapSchema({
  params: Joi.object().keys({ eyelashExtensionId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    technicianName: Joi.string().required().trim(),
    doctorName: Joi.string().required().trim(),
    doctorAddress: Joi.string().required().trim(),
    clientSign: Joi.string().required().trim(),
    isPregnant: Joi.boolean().allow(null),
    eyeSyndrome: Joi.boolean().allow(null),
    hrt: Joi.boolean().allow(null),
    eyeComplaint: Joi.boolean().allow(null),
    skinPatchTest: Joi.boolean().allow(null),
    date: Joi.date().required(),
    skinPatchTestDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
  }),
});

const deleteEyelashExtensionSchema = wrapSchema({
  params: Joi.object().keys({
    eyelashExtensionId: requiredUUIDSchema(),
  }),
});

const getEyelashExtensionByIdSchema = wrapSchema({
  params: Joi.object().keys({
    eyelashExtensionId: requiredUUIDSchema(),
  }),
});

const getEyelashExtensionSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createEyelashExtension: joiMiddleware(createEyelashExtensionSchema),
  editEyelashExtension: joiMiddleware(editEyelashExtensionSchema),
  deleteEyelashExtension: joiMiddleware(deleteEyelashExtensionSchema),
  getEyelashExtensionById: joiMiddleware(getEyelashExtensionByIdSchema),
  getEyelashExtensions: joiMiddleware(getEyelashExtensionSchema),
};
