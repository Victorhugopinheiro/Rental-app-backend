"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getPropertiesController_1 = __importDefault(require("../controllers/propeties/getPropertiesController"));
const createPropertyController_1 = __importDefault(require("../controllers/propeties/createPropertyController"));
const authMiddleware_1 = require("../middlewere/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const getPropetyController_1 = __importDefault(require("../controllers/propeties/getPropetyController"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.get("/", getPropertiesController_1.default);
router.get("/:id", getPropetyController_1.default);
router.post("/", (0, authMiddleware_1.authMiddleware)(["manager"]), upload.array("photos"), createPropertyController_1.default);
exports.default = router;
//# sourceMappingURL=propetiesRoutes.js.map