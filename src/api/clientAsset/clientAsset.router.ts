import express from "express";

import controller from "./clientAsset.controller";
import clientAssetSchems from "./clientAsset.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clientAsset"),
  clientAssetSchems.createClientAsset,
  catchWrap(controller.createClientAsset)
);

router.put(
  "/:clientAssetId",
  canDo("update", "clientAsset"),
  clientAssetSchems.editClientAsset,
  catchWrap(controller.updateClientAsset)
);

router.delete(
  "/:clientAssetId",
  canDo("delete", "clientAsset"),
  clientAssetSchems.deleteClientAsset,
  catchWrap(controller.deleteClientAsset)
);

router.get(
  "/:clientAssetId",
  canDo("read", "clientAsset"),
  clientAssetSchems.getClientAssetById,
  catchWrap(controller.getclientAssetById)
);

router.get(
  "/",
  canDo("read", "clientAsset"),
  clientAssetSchems.getClientAssets,
  catchWrap(controller.getClientAssets)
);

export default router;
