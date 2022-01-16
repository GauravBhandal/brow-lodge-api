import express from "express";

import controller from "./company.controller";
import companySchems from "./company.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.put(
  "/:companyId",
  companySchems.editCompany,
  catchWrap(controller.updateCompany)
);

router.get(
  "/:companyId",
  companySchems.getCompanyById,
  catchWrap(controller.getcompanyById)
);

export default router;
