import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createParticipantMedicationChartSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    levelOfSupportRequired: Joi.string().required(),
    notes: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const editParticipantMedicationChartSchema = wrapSchema({
  params: Joi.object().keys({
    participantMedicationChartId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    levelOfSupportRequired: Joi.string().required(),
    notes: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const deleteParticipantMedicationChartSchema = wrapSchema({
  params: Joi.object().keys({
    participantMedicationChartId: requiredUUIDSchema(),
  }),
});

const getParticipantMedicationChartByIdSchema = wrapSchema({
  params: Joi.object().keys({
    participantMedicationChartId: requiredUUIDSchema(),
  }),
});

const getParticipantMedicationChartSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createParticipantMedicationChart: joiMiddleware(
    createParticipantMedicationChartSchema
  ),
  editParticipantMedicationChart: joiMiddleware(
    editParticipantMedicationChartSchema
  ),
  deleteParticipantMedicationChart: joiMiddleware(
    deleteParticipantMedicationChartSchema
  ),
  getParticipantMedicationChartById: joiMiddleware(
    getParticipantMedicationChartByIdSchema
  ),
  getParticipantMedicationCharts: joiMiddleware(
    getParticipantMedicationChartSchema
  ),
};
