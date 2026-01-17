"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPropertiesService_1 = __importDefault(require("../../services/propeties/getPropertiesService"));
const getPropertiesController = async (req, res) => {
    try {
        const { favoriteIds, priceMin, priceMax, bedrooms, bathrooms, availableFrom, squareFeetMin, squareFeetMax, propertyType, amenities, longitude, latitude, location } = req.query;
        const parsedQuery = {
            location: location ? String(location) : undefined,
            priceMin: priceMin ? Number(priceMin) : undefined,
            priceMax: priceMax ? Number(priceMax) : undefined,
            bedrooms: bedrooms ? Number(bedrooms) : undefined,
            bathrooms: bathrooms ? Number(bathrooms) : undefined,
            squareFeetMin: squareFeetMin ? Number(squareFeetMin) : undefined,
            squareFeetMax: squareFeetMax ? Number(squareFeetMax) : undefined,
            latitude: latitude ? Number(latitude) : undefined,
            longitude: longitude ? Number(longitude) : undefined,
            availableFrom: availableFrom ? String(availableFrom) : undefined,
            propertyType: propertyType ? String(propertyType) : undefined,
            // Tratamento especial para arrays separados por vírgula
            amenities: amenities ? String(amenities).split(",") : undefined,
            favoriteIds: favoriteIds ? String(favoriteIds).split(",").map(Number) : undefined
        };
        const resService = await (0, getPropertiesService_1.default)({
            amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude,
            longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin, location
        });
        return res.status(200).json(resService);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = getPropertiesController;
//# sourceMappingURL=getPropertiesController.js.map