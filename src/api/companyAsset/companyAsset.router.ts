import express from "express";

import controller from "./companyAsset.controller";
import companyAssetSchems from "./companyAsset.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "companyAsset"),
  companyAssetSchems.createCompanyAsset,
  catchWrap(controller.createCompanyAsset)
);

router.put(
  "/:companyAssetId",
  canDo("update", "companyAsset"),
  companyAssetSchems.editCompanyAsset,
  catchWrap(controller.updateCompanyAsset)
);

router.put(
  "/archive/:companyAssetId",
  canDo("delete", "companyAsset"),
  companyAssetSchems.deleteArchiveCompanyAsset,
  catchWrap(controller.deleteArchiveCompanyAsset)
);

router.delete(
  "/:companyAssetId",
  canDo("delete", "companyAsset"),
  companyAssetSchems.deleteCompanyAsset,
  catchWrap(controller.deleteCompanyAsset)
);

router.get(
  "/:companyAssetId",
  canDo("read", "companyAsset"),
  companyAssetSchems.getCompanyAssetById,
  catchWrap(controller.getcompanyAssetById)
);

router.get(
  "/",
  canDo("read", "companyAsset"),
  companyAssetSchems.getCompanyAssets,
  catchWrap(controller.getCompanyAssets)
);

export default router;
