import express from 'express';
import createApplicationController from '../controllers/applications/createApplicationsController';
import updateApplicationIdController from '../controllers/applications/updateApplicationIdController'
import { authMiddleware } from '../middlewere/authMiddleware';

const router = express.Router();

router.post("/", authMiddleware(["tenant"]) ,createApplicationController)
router.put("/id/:applicationId", authMiddleware(["manager"]), updateApplicationIdController)


export default router;