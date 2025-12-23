"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPropertiesService_1 = __importDefault(require("../../services/propeties/getPropertiesService"));
const getPropertiesController = async (req, res) => {
    const { favoriteIds, priceMin, priceMax, bedrooms, bathrooms, availableFrom, squareFeetMin, squareFeetMax, propertyType, amenities, longitude, latitude, } = req.query;
    if (!favoriteIds) {
        return res.status(400).json({ message: "favoriteIds query param is required" });
    }
    const resService = await (0, getPropertiesService_1.default)({
        amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude,
        longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin
    });
    return res.status(200).json(resService);
};
exports.default = getPropertiesController;
//# sourceMappingURL=getPropertiesController.js.map