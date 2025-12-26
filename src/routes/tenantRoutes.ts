import express, { Request, Response } from "express";
import getTenantController from "../controllers/tenants/getTenantController";
import createTenantController from "../controllers/tenants/createTenantController";
import { UpdateTenantInfoController } from "../controllers/tenants/UpdateTenantInfoController";
import getCurrentResidencesController from "../controllers/tenants/getCurrentResidencesController";
import addFavoritePropertyController from "../controllers/tenants/addFavoritePropertyController";
import removeFavoritePropertyController from "../controllers/tenants/removeFavoritePropertyController";
const router = express.Router();



router.get("/:cognitoId", getTenantController)
router.post("/", createTenantController)
router.put("/:cognitoId", UpdateTenantInfoController)
router.get("/:cognitoId/current-residences", getCurrentResidencesController)
router.post("/:cognitoId/add-favorite-property/:propertyId", addFavoritePropertyController)
router.delete("/:congnitoId/remove-favorite-property/:propertyId", removeFavoritePropertyController)


export default router;
