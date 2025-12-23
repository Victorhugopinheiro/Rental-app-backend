"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getTenantController_1 = __importDefault(require("../controllers/tenants/getTenantController"));
const createTenantController_1 = __importDefault(require("../controllers/tenants/createTenantController"));
const UpdateTenantInfoController_1 = require("../controllers/tenants/UpdateTenantInfoController");
const router = express_1.default.Router();
router.get("/:cognitoId", getTenantController_1.default);
router.post("/", createTenantController_1.default);
router.put("/:cognitoId", UpdateTenantInfoController_1.UpdateTenantInfoController);
exports.default = router;
//# sourceMappingURL=tenantRoutes.js.map