import express from 'express';
import { authMiddleware } from '../middlewere/authMiddleware';
import getLeasesPaymentController from '../controllers/leases/getLeasesPaymentController';
import getLeasesController from '../controllers/leases/getLeasesController';
import getUserLeasesController from '../controllers/leases/getUserLeasesController';


const router = express.Router();


router.get("/", authMiddleware(["tenant", "manager"]), getLeasesController)
router.get("/:leaseId/payments", authMiddleware(["tenant", "manager"]), getLeasesPaymentController)
router.get("/leasesUser", authMiddleware(["tenant", "manager"]), getUserLeasesController)