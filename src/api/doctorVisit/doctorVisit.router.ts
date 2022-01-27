import express from "express";

import controller from "./doctorVisit.controller";
import doctorVisitSchems from "./doctorVisit.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "doctorVisit"),
  doctorVisitSchems.createDoctorVisit,
  catchWrap(controller.createDoctorVisit)
);

router.put(
  "/:doctorVisitId",
  canDo("update", "doctorVisit"),
  doctorVisitSchems.editDoctorVisit,
  catchWrap(controller.updateDoctorVisit)
);

router.delete(
  "/:doctorVisitId",
  canDo("delete", "doctorVisit"),
  doctorVisitSchems.deleteDoctorVisit,
  catchWrap(controller.deleteDoctorVisit)
);

router.get(
  "/:doctorVisitId",
  canDo("read", "doctorVisit"),
  doctorVisitSchems.getDoctorVisitById,
  catchWrap(controller.getdoctorVisitById)
);

router.get(
  "/",
  canDo("read", "doctorVisit"),
  doctorVisitSchems.getDoctorVisits,
  catchWrap(controller.getDoctorVisits)
);

export default router;
