import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createMeetingLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    meetingType: Joi.string().required(), // TODO: Add one off
    location: Joi.string().required(),
    purpose: Joi.string().required(),
    attendees: Joi.string().required(),
    apologies: Joi.string().required(),
    agenda: Joi.string().required(),
    discussion: Joi.string().required(),
    action: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editMeetingLogSchema = wrapSchema({
  params: Joi.object().keys({ meetingLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    meetingType: Joi.string().required(), // TODO: Add one off
    location: Joi.string().required(),
    purpose: Joi.string().required(),
    attendees: Joi.string().required(),
    apologies: Joi.string().required(),
    agenda: Joi.string().required(),
    discussion: Joi.string().required(),
    action: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteMeetingLogSchema = wrapSchema({
  params: Joi.object().keys({
    meetingLogId: requiredUUIDSchema(),
  }),
});

const getMeetingLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    meetingLogId: requiredUUIDSchema(),
  }),
});

const getMeetingLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createMeetingLog: joiMiddleware(createMeetingLogSchema),
  editMeetingLog: joiMiddleware(editMeetingLogSchema),
  deleteMeetingLog: joiMiddleware(deleteMeetingLogSchema),
  getMeetingLogById: joiMiddleware(getMeetingLogByIdSchema),
  getMeetingLogs: joiMiddleware(getMeetingLogSchema),
};
