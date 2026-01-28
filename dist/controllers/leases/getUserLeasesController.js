"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUserLeasesService_1 = __importDefault(require("../../services/leases/getUserLeasesService"));
const getUserLeasesController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "UserId é obrigatório" });
        }
        const userLeases = await (0, getUserLeasesService_1.default)({ userId });
        res.status(200).json({ userLeases });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.default = getUserLeasesController;
//# sourceMappingURL=getUserLeasesController.js.map