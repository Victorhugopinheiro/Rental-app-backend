"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrentResidencesService_1 = __importDefault(require("../../services/tenants/getCurrentResidencesService"));
const getCurrentResidencesController = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        if (!cognitoId) {
            return res.status(400).json({ message: "CognitoId é Obrigatório" });
        }
        const residenceService = await (0, getCurrentResidencesService_1.default)({ cognitoId });
        return res.status(200).json(residenceService);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = getCurrentResidencesController;
//# sourceMappingURL=getCurrentResidencesController.js.map