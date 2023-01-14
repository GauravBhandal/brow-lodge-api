import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createInjuryReportSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    description: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editInjuryReportSchema = wrapSchema({
  params: Joi.object().keys({ injuryReportId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: requiredTimeSchema(),
    description: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteInjuryReportSchema = wrapSchema({
  params: Joi.object().keys({
    injuryReportId: requiredUUIDSchema(),
  }),
});

const deleteArchiveInjuryReportSchema = wrapSchema({
  params: Joi.object().keys({
    injuryReportId: requiredUUIDSchema(),
  }),
});

const getInjuryReportByIdSchema = wrapSchema({
  params: Joi.object().keys({
    injuryReportId: requiredUUIDSchema(),
  }),
});

const getInjuryReportSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createInjuryReport: joiMiddleware(createInjuryReportSchema),
  editInjuryReport: joiMiddleware(editInjuryReportSchema),
  deleteInjuryReport: joiMiddleware(deleteInjuryReportSchema),
  deleteArchiveInjuryReport: joiMiddleware(deleteArchiveInjuryReportSchema),
  getInjuryReportById: joiMiddleware(getInjuryReportByIdSchema),
  getInjuryReports: joiMiddleware(getInjuryReportSchema),
};
