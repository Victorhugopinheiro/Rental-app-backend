"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createApplicationsController_1 = __importDefault(require("../controllers/applications/createApplicationsController"));
const updateApplicationIdController_1 = __importDefault(require("../controllers/applications/updateApplicationIdController"));
const authMiddleware_1 = require("../middlewere/authMiddleware");
const listApplicationsController_1 = __importDefault(require("../controllers/applications/listApplicationsController"));
const router = express_1.default.Router();
router.post("/", (0, authMiddleware_1.authMiddleware)(["tenant"]), createApplicationsController_1.default);
router.put("/id/:applicationId", (0, authMiddleware_1.authMiddleware)(["manager"]), updateApplicationIdController_1.default);
router.get("/", (0, authMiddleware_1.authMiddleware)(["manager", "tenant"]), listApplicationsController_1.default);
exports.default = router;
//# sourceMappingURL=applicationRoutes.js.map