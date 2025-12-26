"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateApplicationIdService_1 = __importDefault(require("../../services/applications/updateApplicationIdService"));
const updateApplicationIdController = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        if (!applicationId) {
            return res.status(400).json({ message: "ApplicationId é obrigatório" });
        }
        const updateApplicationService = await (0, updateApplicationIdService_1.default)({ applicationId, status });
        res.status(200).json(updateApplicationService);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = updateApplicationIdController;
//# sourceMappingURL=updateApplicationIdController.js.map