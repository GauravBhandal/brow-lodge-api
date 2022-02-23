import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createRestrictivePracticeLogSchema = wrapSchema({
  body: Joi.object().keys({
    isAuthorised: Joi.boolean().required(),
    type: Joi.string().required(),
    impactOnAnyPerson: Joi.string().required(),
    injuryToAnyPerson: Joi.string().required(),
    wasReportableIncident: Joi.string().required(),
    reasonBehindUse: Joi.string().required(),
    describeBehaviour: Joi.string().required(),
    startDate: Joi.date().required(),
    startTime: requiredTimeSchema(),
    startLocation: Joi.string().required(),
    endDate: Joi.date().required(),
    endTime: requiredTimeSchema(),
    endLocation: Joi.string().required(),
    anyWitness: Joi.string().required(),
    actionTakenInResponse: Joi.string().required(),
    alternativesConsidered: Joi.string().required(),
    actionTakenLeadingUpTo: Joi.string().required(),
    staff: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
    client: requiredUUIDSchema(),
  }),
});

const editRestrictivePracticeLogSchema = wrapSchema({
  params: Joi.object().keys({ restrictivePracticeLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    isAuthorised: Joi.boolean().required(),
    type: Joi.string().required(),
    impactOnAnyPerson: Joi.string().required(),
    injuryToAnyPerson: Joi.string().required(),
    wasReportableIncident: Joi.boolean().required(),
    reasonBehindUse: Joi.string().required(),
    describeBehaviour: Joi.string().required(),
    startDate: Joi.date().required(),
    startTime: requiredTimeSchema(),
    startLocation: Joi.string().required(),
    endDate: Joi.date().required(),
    endTime: requiredTimeSchema(),
    endLocation: Joi.string().required(),
    anyWitness: Joi.string().required(),
    actionTakenInResponse: Joi.string().required(),
    alternativesConsidered: Joi.string().required(),
    actionTakenLeadingUpTo: Joi.string().required(),
    staff: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
    client: requiredUUIDSchema(),
  }),
});

const deleteRestrictivePracticeLogSchema = wrapSchema({
  params: Joi.object().keys({
    restrictivePracticeLogId: requiredUUIDSchema(),
  }),
});

const getRestrictivePracticeLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    restrictivePracticeLogId: requiredUUIDSchema(),
  }),
});

const getRestrictivePracticeLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createRestrictivePracticeLog: joiMiddleware(
    createRestrictivePracticeLogSchema
  ),
  editRestrictivePracticeLog: joiMiddleware(editRestrictivePracticeLogSchema),
  deleteRestrictivePracticeLog: joiMiddleware(
    deleteRestrictivePracticeLogSchema
  ),
  getRestrictivePracticeLogById: joiMiddleware(
    getRestrictivePracticeLogByIdSchema
  ),
  getRestrictivePracticeLogs: joiMiddleware(getRestrictivePracticeLogSchema),
};
