import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createTeamSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    staff: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
    client: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editTeamSchema = wrapSchema({
  params: Joi.object().keys({ teamId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    staff: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
    client: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const deleteTeamSchema = wrapSchema({
  params: Joi.object().keys({
    teamId: requiredUUIDSchema(),
  }),
});

const getTeamByIdSchema = wrapSchema({
  params: Joi.object().keys({
    teamId: requiredUUIDSchema(),
  }),
});

const getTeamSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTeam: joiMiddleware(createTeamSchema),
  editTeam: joiMiddleware(editTeamSchema),
  deleteTeam: joiMiddleware(deleteTeamSchema),
  getTeamById: joiMiddleware(getTeamByIdSchema),
  getTeams: joiMiddleware(getTeamSchema),
};
