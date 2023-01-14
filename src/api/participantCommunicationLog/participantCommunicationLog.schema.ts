import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredTimeSchema,
  requiredUUIDSchema,
  wrapSchema,
} from "../../common/joiSchemas";

const createParticipantCommunicationLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    communicationWith: Joi.string().allow("", null),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editParticipantCommunicationLogSchema = wrapSchema({
  params: Joi.object().keys({
    participantCommunicationLogId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    communicationWith: Joi.string().allow("", null),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteParticipantCommunicationLogSchema = wrapSchema({
  params: Joi.object().keys({
    participantCommunicationLogId: requiredUUIDSchema(),
  }),
});

const deleteArchiveParticipantCommunicationLogSchema = wrapSchema({
  params: Joi.object().keys({
    participantCommunicationLogId: requiredUUIDSchema(),
  }),
});

const getParticipantCommunicationLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    participantCommunicationLogId: requiredUUIDSchema(),
  }),
});

const getParticipantCommunicationLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createParticipantCommunicationLog: joiMiddleware(
    createParticipantCommunicationLogSchema
  ),
  editParticipantCommunicationLog: joiMiddleware(
    editParticipantCommunicationLogSchema
  ),
  deleteParticipantCommunicationLog: joiMiddleware(
    deleteParticipantCommunicationLogSchema
  ),
  deleteArchiveParticipantCommunicationLog: joiMiddleware(
    deleteArchiveParticipantCommunicationLogSchema
  ),
  getParticipantCommunicationLogById: joiMiddleware(
    getParticipantCommunicationLogByIdSchema
  ),
  getParticipantCommunicationLogs: joiMiddleware(
    getParticipantCommunicationLogSchema
  ),
};
