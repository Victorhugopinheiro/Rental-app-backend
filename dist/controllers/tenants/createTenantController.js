"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTenantController = void 0;
const createTenantService_1 = __importDefault(require("../../services/tenants/createTenantService"));
const createTenantController = async (req, res) => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const resService = await (0, createTenantService_1.default)({ cognitoId, name, email, phoneNumber });
        if (resService) {
            res.status(201).json(resService);
        }
        else {
            res.status(400).json({ message: "Error creating tenant" });
        }
    }
    catch (error) {
        console.error("Error getting tenant:", error);
        res.status(500).json({ message: `Internal server error` });
    }
};
exports.createTenantController = createTenantController;
exports.default = exports.createTenantController;
//# sourceMappingURL=createTenantController.js.map