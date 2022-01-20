import express from "express";

import controller from "./clientAsset.controller";
import clientAssetSchems from "./clientAsset.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  clientAssetSchems.createClientAsset,
  catchWrap(controller.createClientAsset)
);

router.put(
  "/:clientAssetId",
  clientAssetSchems.editClientAsset,
  catchWrap(controller.updateClientAsset)
);

router.delete(
  "/:clientAssetId",
  clientAssetSchems.deleteClientAsset,
  catchWrap(controller.deleteClientAsset)
);

router.get(
  "/:clientAssetId",
  clientAssetSchems.getClientAssetById,
  catchWrap(controller.getclientAssetById)
);

router.get(
  "/",
  clientAssetSchems.getClientAssets,
  catchWrap(controller.getClientAssets)
);

export default router;
