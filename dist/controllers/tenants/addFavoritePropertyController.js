"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addFavoritePropertyService_1 = __importDefault(require("../../services/tenants/addFavoritePropertyService"));
const addFavoritePropertyController = async (req, res) => {
    try {
        const { cognitoId, propertyId } = req.params;
        if (!cognitoId || !propertyId) {
            return res.status(400).json({ message: "cognitoId and propertyId are required" });
        }
        const favoriteService = await (0, addFavoritePropertyService_1.default)({ cognitoId, propertyId: Number(propertyId) });
        return res.status(200).json(favoriteService);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};
exports.default = addFavoritePropertyController;
//# sourceMappingURL=addFavoritePropertyController.js.map