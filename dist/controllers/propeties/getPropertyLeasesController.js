"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPropertyLeasesService_1 = __importDefault(require("../../services/propeties/getPropertyLeasesService"));
const getPropertyLeasesController = async (req, res) => {
    try {
        const { propertyId } = req.params;
        if (!propertyId) {
            return res.status(400).json({ message: "PropertyId is required" });
        }
        const propertyIdNumber = Number(propertyId);
        const leasesService = await (0, getPropertyLeasesService_1.default)(propertyIdNumber);
        res.status(200).json(leasesService);
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = getPropertyLeasesController;
//# sourceMappingURL=getPropertyLeasesController.js.map