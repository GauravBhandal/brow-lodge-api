import express from "express";

import controller from "./companyAsset.controller";
import companyAssetSchems from "./companyAsset.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  companyAssetSchems.createCompanyAsset,
  catchWrap(controller.createCompanyAsset)
);

router.put(
  "/:companyAssetId",
  companyAssetSchems.editCompanyAsset,
  catchWrap(controller.updateCompanyAsset)
);

router.delete(
  "/:companyAssetId",
  companyAssetSchems.deleteCompanyAsset,
  catchWrap(controller.deleteCompanyAsset)
);

router.get(
  "/:companyAssetId",
  companyAssetSchems.getCompanyAssetById,
  catchWrap(controller.getcompanyAssetById)
);

router.get(
  "/",
  companyAssetSchems.getCompanyAssets,
  catchWrap(controller.getCompanyAssets)
);

export default router;
