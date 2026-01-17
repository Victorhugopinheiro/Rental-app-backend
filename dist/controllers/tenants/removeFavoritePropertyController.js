"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const removeFavoritePropertyService_1 = __importDefault(require("../../services/tenants/removeFavoritePropertyService"));
const removeFavoritePropertyController = async (req, res) => {
    try {
        const { cognitoId, propertyId } = req.params;
        if (!cognitoId || !propertyId) {
            return res.status(400).json({ message: "cognitoId and propertyId are required" });
        }
        const removeFavoriteService = await (0, removeFavoritePropertyService_1.default)({ cognitoId, propertyId: Number(propertyId) });
        return res.status(200).json(removeFavoriteService);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};
exports.default = removeFavoritePropertyController;
//# sourceMappingURL=removeFavoritePropertyController.js.map