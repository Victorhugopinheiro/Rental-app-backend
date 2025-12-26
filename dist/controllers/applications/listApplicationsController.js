"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listApplicationsService_1 = __importDefault(require("../../services/applications/listApplicationsService"));
const ListApplicationsController = async (req, res) => {
    try {
        const { userId, userRole } = req.query;
        const applications = await (0, listApplicationsService_1.default)({ userId, userRole });
        return res.status(200).json(applications);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = ListApplicationsController;
//# sourceMappingURL=listApplicationsController.js.map