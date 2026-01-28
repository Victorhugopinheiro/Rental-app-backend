"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLeasesService_1 = __importDefault(require("../../services/leases/getLeasesService"));
const getLeasesController = async (req, res) => {
    try {
        const leasesService = await (0, getLeasesService_1.default)();
        if (!leasesService) {
            return res.status(404).json({ message: 'Leases not found' });
        }
        return res.status(200).json({ leasesService });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.default = getLeasesController;
//# sourceMappingURL=getLeasesController.js.map