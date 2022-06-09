import express from "express";

import controller from "./participantMedicationChart.controller";
import participantMedicationChartSchems from "./participantMedicationChart.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "participantMedicationChart"),
  participantMedicationChartSchems.createParticipantMedicationChart,
  catchWrap(controller.createParticipantMedicationChart)
);

router.put(
  "/:participantMedicationChartId",
  canDo("update", "participantMedicationChart"),
  participantMedicationChartSchems.editParticipantMedicationChart,
  catchWrap(controller.updateParticipantMedicationChart)
);

router.delete(
  "/:participantMedicationChartId",
  canDo("delete", "participantMedicationChart"),
  participantMedicationChartSchems.deleteParticipantMedicationChart,
  catchWrap(controller.deleteParticipantMedicationChart)
);

router.get(
  "/:participantMedicationChartId",
  canDo("read", "participantMedicationChart"),
  participantMedicationChartSchems.getParticipantMedicationChartById,
  catchWrap(controller.getparticipantMedicationChartById)
);

router.get(
  "/",
  canDo("read", "participantMedicationChart"),
  participantMedicationChartSchems.getParticipantMedicationCharts,
  catchWrap(controller.getParticipantMedicationCharts)
);

export default router;
