"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createPropertyService_1 = __importDefault(require("../../services/propeties/createPropertyService"));
const createPropertyController = async (req, res) => {
    try {
        const files = req.files;
        const { address, city, state, country, postalCode, managerCognitoId, pricePerMonth, securityDeposit, applicationFee, beds, baths, squareFeet, isPetsAllowed, isParkingIncluded, amenities, highlights, propertyType, name, description } = req.body;
        // Helper to parse boolean
        const parseBoolean = (val) => val === 'true' || val === true;
        // Helper to parse number
        const parseNumber = (val) => Number(val);
        const input = {
            address,
            city,
            state,
            country,
            postalCode,
            managerCognitoId,
            name,
            description,
            pricePerMonth: parseNumber(pricePerMonth),
            securityDeposit: parseNumber(securityDeposit),
            applicationFee: parseNumber(applicationFee),
            beds: parseNumber(beds),
            baths: parseNumber(baths),
            squareFeet: parseNumber(squareFeet),
            isPetsAllowed: parseBoolean(isPetsAllowed),
            isParkingIncluded: parseBoolean(isParkingIncluded),
            amenities: amenities ? (typeof amenities === 'string' ? amenities.split(',') : amenities) : [],
            highlights: highlights ? (typeof highlights === 'string' ? highlights.split(',') : highlights) : [],
            propertyType: propertyType,
            images: files
        };
        const property = await (0, createPropertyService_1.default)(input);
        res.status(201).json(property);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = createPropertyController;
//# sourceMappingURL=createPropertyController.js.map