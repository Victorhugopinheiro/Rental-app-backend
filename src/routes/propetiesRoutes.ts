
import express from "express";
import getPropertiesController from "../controllers/propeties/getPropertiesController";
import createPropertyController from "../controllers/propeties/createPropertyController";
import { authMiddleware } from "../middlewere/authMiddleware";
import multer from "multer";
import getPropertyController from "../controllers/propeties/getPropetyController";
import getPropertyLeasesController from "../controllers/propeties/getPropertyLeasesController";
const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/", getPropertiesController )
router.get("/:id", getPropertyController )
router.post("/", authMiddleware(["manager"]), upload.array("photos"), createPropertyController)
router.get("/:propertyId/leases", getPropertyLeasesController)

export default router;