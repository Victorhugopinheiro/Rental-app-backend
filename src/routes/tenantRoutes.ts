import express, {Request, Response} from "express";
import getTenantController from "../controllers/tenants/getTenantController";
import createTenantController from "../controllers/tenants/createTenantController";
import { UpdateTenantInfoController } from "../controllers/tenants/UpdateTenantInfoController";
const router = express.Router();



router.get("/:cognitoId", getTenantController)
router.post("/", createTenantController)
router.put("/:cognitoId", UpdateTenantInfoController )


export default router;
