import express from "express";

import controller from "./doctorVisit.controller";
import doctorVisitSchems from "./doctorVisit.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  doctorVisitSchems.createDoctorVisit,
  catchWrap(controller.createDoctorVisit)
);

router.put(
  "/:doctorVisitId",
  doctorVisitSchems.editDoctorVisit,
  catchWrap(controller.updateDoctorVisit)
);

router.delete(
  "/:doctorVisitId",
  doctorVisitSchems.deleteDoctorVisit,
  catchWrap(controller.deleteDoctorVisit)
);

router.get(
  "/:doctorVisitId",
  doctorVisitSchems.getDoctorVisitById,
  catchWrap(controller.getdoctorVisitById)
);

router.get(
  "/",
  doctorVisitSchems.getDoctorVisits,
  catchWrap(controller.getDoctorVisits)
);

export default router;
