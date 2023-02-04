import express from "express";

import controller from "./team.controller";
import teamSchems from "./team.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "team"),
  teamSchems.createTeam,
  catchWrap(controller.createTeam)
);

router.put(
  "/permissions",
  canDo("update", "team"),
  teamSchems.updateTeamPermissions,
  catchWrap(controller.updateTeamPermissions)
);

router.put(
  "/:teamId",
  canDo("update", "team"),
  teamSchems.editTeam,
  catchWrap(controller.updateTeam)
);

router.put(
  "/archive/:teamId",
  canDo("delete", "team"),
  teamSchems.deleteArchiveTeam,
  catchWrap(controller.deleteArchiveTeam)
);

router.delete(
  "/:teamId",
  canDo("delete", "team"),
  teamSchems.deleteTeam,
  catchWrap(controller.deleteTeam)
);

router.get(
  "/:teamId",
  canDo("read", "team"),
  teamSchems.getTeamById,
  catchWrap(controller.getteamById)
);

router.get(
  "/",
  // canDo("read", "team"), TODO: Every user need to make a GET request
  teamSchems.getTeams,
  catchWrap(controller.getTeams)
);

export default router;
