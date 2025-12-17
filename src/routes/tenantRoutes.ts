import express, {Request, Response} from "express";
import getTenantController from "../controllers/tenants/getTenantController";
import createTenantController from "../controllers/tenants/createTenantController";
const router = express.Router();



router.get("/:cognitoId", getTenantController)
router.post("/", createTenantController)
router.put("/:cognitoId", )


export default router;
