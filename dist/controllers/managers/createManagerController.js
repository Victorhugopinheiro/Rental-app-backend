"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManagerController = void 0;
const createManagerService_1 = __importDefault(require("../../services/managers/createManagerService"));
const createManagerController = async (req, res) => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const resService = await (0, createManagerService_1.default)({ cognitoId, name, email, phoneNumber });
        if (resService) {
            res.status(201).json(resService);
        }
        else {
            res.status(400).json({ message: "Error creating manager" });
        }
    }
    catch (error) {
        console.error("Error getting manager:", error);
        res.status(500).json({ message: `Internal server error` });
    }
};
exports.createManagerController = createManagerController;
exports.default = exports.createManagerController;
//# sourceMappingURL=createManagerController.js.map