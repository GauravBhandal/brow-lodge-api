import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createIncidentSchema = wrapSchema({
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
    manager: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editIncidentSchema = wrapSchema({
  params: Joi.object().keys({ incidentId: requiredUUIDSchema() }),
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
    manager: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteIncidentSchema = wrapSchema({
  params: Joi.object().keys({
    incidentId: requiredUUIDSchema(),
  }),
});

const getIncidentByIdSchema = wrapSchema({
  params: Joi.object().keys({
    incidentId: requiredUUIDSchema(),
  }),
});

const getIncidentSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createIncident: joiMiddleware(createIncidentSchema),
  editIncident: joiMiddleware(editIncidentSchema),
  deleteIncident: joiMiddleware(deleteIncidentSchema),
  getIncidentById: joiMiddleware(getIncidentByIdSchema),
  getIncidents: joiMiddleware(getIncidentSchema),
};
