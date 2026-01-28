import express from 'express';
import createApplicationController from '../controllers/applications/createApplicationsController';
import updateApplicationIdController from '../controllers/applications/updateApplicationIdController'
import { authMiddleware } from '../middlewere/authMiddleware';
import ListApplicationsController from '../controllers/applications/listApplicationsController';

const router = express.Router();

router.post("/", authMiddleware(["tenant"]) ,createApplicationController)
router.put("/applicationId/:applicationId", authMiddleware(["manager"]), updateApplicationIdController)
router.get("/", authMiddleware(["manager", "tenant"]), ListApplicationsController)

export default router;