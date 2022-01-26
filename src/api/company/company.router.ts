import express from "express";

import controller from "./company.controller";
import companySchems from "./company.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.put(
  "/",
  canDo("update", "company"),
  companySchems.editMyCompany,
  catchWrap(controller.updateMyCompany)
);

router.get("/", canDo("read", "company"), catchWrap(controller.getMyCompany));

export default router;
