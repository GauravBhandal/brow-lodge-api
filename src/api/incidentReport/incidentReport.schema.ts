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
    incidentDescription: Joi.string().required(),
    eventsPriorToIncident: Joi.string().required(),
    actionsTakenByStaff: Joi.string().required(),
    actionsTakenByOthers: Joi.string().required(),
    anyOtherWitness: Joi.string().required(),
    incidentReportedTo: Joi.string().allow("", null),
    assessmentAndDebriefing: Joi.string().allow("", null),
    findingsAndActionsTaken: Joi.string().allow("", null),
    status: Joi.string().allow("", null),
    closureDate: Joi.date(),
    client: requiredUUIDSchema(),
    staff: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
    types: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
    manager: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editIncidentReportSchema = wrapSchema({
  params: Joi.object().keys({ incidentReportId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date(),
    time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
    location: Joi.string(),
    incidentDescription: Joi.string(),
    eventsPriorToIncident: Joi.string(),
    actionsTakenByStaff: Joi.string(),
    actionsTakenByOthers: Joi.string(),
    anyOtherWitness: Joi.string(),
    incidentReportedTo: Joi.string().allow("", null),
    assessmentAndDebriefing: Joi.string().allow("", null),
    findingsAndActionsTaken: Joi.string().allow("", null),
    status: Joi.string().allow("", null),
    closureDate: Joi.date().allow(null),
    client: Joi.string().uuid({ version: "uuidv4" }),
    staff: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
    types: Joi.array().items(Joi.string().uuid({ version: "uuidv4" })),
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
