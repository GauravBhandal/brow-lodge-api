import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createProgressReportSchema = wrapSchema({
  body: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    documentedOn: Joi.date().required(),
    progressNotes: Joi.string().required(),
    behaviourOfConcerns: Joi.string().required(),
    diet: Joi.string().required(),
    fluids: Joi.string().required(),
    activities: Joi.string().required(),
    chokingObservations: Joi.string().allow("", null),
    appointmentsOrFamilyVisits: Joi.string().allow("", null),
    staffAdministeredMedication: Joi.string().allow("", null),
    ndisGoalSetting: Joi.string().allow("", null),
    independentSkills: Joi.string().allow("", null),
    communityAccess: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editProgressReportSchema = wrapSchema({
  params: Joi.object().keys({ progressReportId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    documentedOn: Joi.date().required(),
    progressNotes: Joi.string().required(),
    behaviourOfConcerns: Joi.string().required(),
    diet: Joi.string().required(),
    fluids: Joi.string().required(),
    activities: Joi.string().required(),
    chokingObservations: Joi.string().allow("", null),
    appointmentsOrFamilyVisits: Joi.string().allow("", null),
    staffAdministeredMedication: Joi.string().allow("", null),
    ndisGoalSetting: Joi.string().allow("", null),
    independentSkills: Joi.string().allow("", null),
    communityAccess: Joi.string().allow("", null),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteProgressReportSchema = wrapSchema({
  params: Joi.object().keys({
    progressReportId: requiredUUIDSchema(),
  }),
});

const getProgressReportByIdSchema = wrapSchema({
  params: Joi.object().keys({
    progressReportId: requiredUUIDSchema(),
  }),
});

const getProgressReportSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createProgressReport: joiMiddleware(createProgressReportSchema),
  editProgressReport: joiMiddleware(editProgressReportSchema),
  deleteProgressReport: joiMiddleware(deleteProgressReportSchema),
  getProgressReportById: joiMiddleware(getProgressReportByIdSchema),
  getProgressReports: joiMiddleware(getProgressReportSchema),
};
