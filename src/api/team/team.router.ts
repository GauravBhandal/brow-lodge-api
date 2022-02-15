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
  "/:teamId",
  canDo("update", "team"),
  teamSchems.editTeam,
  catchWrap(controller.updateTeam)
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
  canDo("read", "team"),
  teamSchems.getTeams,
  catchWrap(controller.getTeams)
);

export default router;
