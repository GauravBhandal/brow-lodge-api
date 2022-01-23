import express from "express";

import controller from "./company.controller";
import companySchems from "./company.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.put(
  "/",
  companySchems.editMyCompany,
  catchWrap(controller.updateMyCompany)
);

router.get("/", catchWrap(controller.getMyCompany));

export default router;
