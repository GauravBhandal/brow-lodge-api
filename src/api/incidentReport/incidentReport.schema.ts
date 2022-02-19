import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createIncidentReportSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    location: Joi.string().required(),
    incidentReportDescription: Joi.string().required(),
    eventsPriorToIncidentReport: Joi.string().required(),
    actionsTakenByStaff: Joi.string().required(),
    actionsTakenByOthers: Joi.string().required(),
    anyOtherWitness: Joi.string().required(),
    incidentReportReportedTo: Joi.string().allow("", null),
    assessmentAndDebriefing: Joi.string().allow("", null),
    findingsAndActionsTaken: Joi.string().allow("", null),
    status: Joi.string().allow("", null),
    closureDate: Joi.date(),
    client: requiredUUIDSchema(),
    manager: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editIncidentReportSchema = wrapSchema({
  params: Joi.object().keys({ incidentReportId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    location: Joi.string().required(),
    incidentReportDescription: Joi.string().required(),
    eventsPriorToIncidentReport: Joi.string().required(),
    actionsTakenByStaff: Joi.string().required(),
    actionsTakenByOthers: Joi.string().required(),
    anyOtherWitness: Joi.string().required(),
    incidentReportReportedTo: Joi.string().allow("", null),
    assessmentAndDebriefing: Joi.string().allow("", null),
    findingsAndActionsTaken: Joi.string().allow("", null),
    status: Joi.string().allow("", null),
    closureDate: Joi.date(),
    client: requiredUUIDSchema(),
    manager: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteIncidentReportSchema = wrapSchema({
  params: Joi.object().keys({
    incidentReportId: requiredUUIDSchema(),
  }),
});

const getIncidentReportByIdSchema = wrapSchema({
  params: Joi.object().keys({
    incidentReportId: requiredUUIDSchema(),
  }),
});

const getIncidentReportSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createIncidentReport: joiMiddleware(createIncidentReportSchema),
  editIncidentReport: joiMiddleware(editIncidentReportSchema),
  deleteIncidentReport: joiMiddleware(deleteIncidentReportSchema),
  getIncidentReportById: joiMiddleware(getIncidentReportByIdSchema),
  getIncidentReports: joiMiddleware(getIncidentReportSchema),
};
