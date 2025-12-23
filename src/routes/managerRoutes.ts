import express, {Request, Response} from "express";
import getTenantController from "../controllers/tenants/getTenantController";
import getManagerController from "../controllers/managers/getManagerController";
import createManagerController from "../controllers/managers/createManagerController";
import { UpdateManagerInfoController } from "../controllers/managers/UpdateManagerInfoController";
import getManagerPropertiesController from "../controllers/managers/getManagerPropertiesController";
const router = express.Router();



router.get("/:cognitoId", getManagerController)
router.post("/", createManagerController)
router.put("/:cognitoId", UpdateManagerInfoController)
router.get("/:managerId/properties", getManagerPropertiesController)


export default router;
