import express from "express";

import controller from "./company.controller";
import companySchems from "./company.schema";
import { catchWrap } from "../../components/errors";
import authMiddleware from "../../components/auth";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  companySchems.createCompany,
  catchWrap(controller.createCompany)
);

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
