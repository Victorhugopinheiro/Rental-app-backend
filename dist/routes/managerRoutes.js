"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getManagerController_1 = __importDefault(require("../controllers/managers/getManagerController"));
const createManagerController_1 = __importDefault(require("../controllers/managers/createManagerController"));
const UpdateManagerInfoController_1 = require("../controllers/managers/UpdateManagerInfoController");
const router = express_1.default.Router();
router.get("/:cognitoId", getManagerController_1.default);
router.post("/", createManagerController_1.default);
router.put("/cognitoId", UpdateManagerInfoController_1.UpdateManagerInfoController);
exports.default = router;
//# sourceMappingURL=managerRoutes.js.map