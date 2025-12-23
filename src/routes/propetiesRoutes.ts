
import express from "express";
import getPropertiesController from "../controllers/propeties/getPropertiesController";
import createPropertyController from "../controllers/propeties/createPropertyController";
import { authMiddleware } from "../middlewere/authMiddleware";
import multer from "multer";
const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/", getPropertiesController )
router.get("/:id", getPropertiesController )
router.post("/", authMiddleware(["manager"]), upload.array("photos"), createPropertyController)

export default router;