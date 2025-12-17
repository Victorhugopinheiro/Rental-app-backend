"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManagerController = void 0;
const getManagerService_1 = __importDefault(require("../../services/managers/getManagerService"));
const getManagerController = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        const resService = await (0, getManagerService_1.default)({ cognitoId });
        if (resService) {
            res.status(200).json(resService);
        }
        else {
            res.status(404).json({ message: "Manager not found" });
        }
    }
    catch (error) {
        console.error("Error getting tenant:", error);
        res.status(500).json({ message: `Internal server error` });
    }
};
exports.getManagerController = getManagerController;
exports.default = exports.getManagerController;
//# sourceMappingURL=getManagerController.js.map