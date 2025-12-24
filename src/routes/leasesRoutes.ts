import express from 'express';
import { authMiddleware } from '../middlewere/authMiddleware';
import getLeasesPaymentController from '../controllers/leases/getLeasesPaymentController';


const router = express.Router();


router.get("/", authMiddleware(["tenant", "manager"]))
router.get("/:leaseId/payments", authMiddleware(["tenant", "manager"]), getLeasesPaymentController)