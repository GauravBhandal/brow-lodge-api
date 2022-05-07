import express from "express";

import controller from "./timesheet.controller";
import timesheetSchems from "./timesheet.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("update", "timesheet"),
  timesheetSchems.generateInvoices,
  catchWrap(controller.generateInvoices)
);

router.put(
  "/status",
  canDo("update", "timesheet"),
  timesheetSchems.updateTimesheetStatus,
  catchWrap(controller.updateTimesheetStatus)
);

router.put(
  "/:timesheetId",
  canDo("update", "timesheet"),
  timesheetSchems.editTimesheet,
  catchWrap(controller.updateTimesheet)
);

router.get(
  "/:timesheetId",
  canDo("read", "timesheet"),
  timesheetSchems.getTimesheetById,
  catchWrap(controller.getTimesheetById)
);

router.get(
  "/",
  canDo("read", "timesheet"),
  timesheetSchems.getTimesheets,
  catchWrap(controller.getTimesheets)
);

export default router;
