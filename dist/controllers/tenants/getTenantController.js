"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantController = void 0;
const getTenantService_1 = __importDefault(require("../../services/tenants/getTenantService"));
const getTenantController = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        const resService = await (0, getTenantService_1.default)({ cognitoId });
        if (resService) {
            res.status(200).json(resService);
        }
        else {
            res.status(404).json({ message: "Tenant not found" });
        }
    }
    catch (error) {
        console.error("Error getting tenant:", error);
        res.status(500).json({ message: `Internal server error` });
    }
};
exports.getTenantController = getTenantController;
exports.default = exports.getTenantController;
//# sourceMappingURL=getTenantController.js.map