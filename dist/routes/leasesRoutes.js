"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewere/authMiddleware");
const getLeasesPaymentController_1 = __importDefault(require("../controllers/leases/getLeasesPaymentController"));
const router = express_1.default.Router();
router.get("/", (0, authMiddleware_1.authMiddleware)(["tenant", "manager"]));
router.get("/:leaseId/payments", (0, authMiddleware_1.authMiddleware)(["tenant", "manager"]), getLeasesPaymentController_1.default);
//# sourceMappingURL=leasesRoutes.js.map