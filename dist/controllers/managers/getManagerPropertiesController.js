"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getManagerPropertiesService_1 = __importDefault(require("../../services/managers/getManagerPropertiesService"));
const getManagerPropertiesController = async (req, res) => {
    const { managerId } = req.params;
    if (!managerId) {
        res.status(400).json({ message: "Id do manager é obrigatório" });
    }
    const ProperiesService = await (0, getManagerPropertiesService_1.default)(managerId);
    res.status(200).json(ProperiesService);
};
exports.default = getManagerPropertiesController;
//# sourceMappingURL=getManagerPropertiesController.js.map