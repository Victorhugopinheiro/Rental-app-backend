"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const client_s3_1 = require("@aws-sdk/client-s3");
const axios_1 = __importDefault(require("axios"));
const createPropertyService = async (input) => {
    const s3Client = new client_s3_1.S3Client({
        region: process.env.AWS_REGION || "us-east-1",
    });
    const { address, city, state, country, postalCode, managerCognitoId, images, ...propertyData } = input;
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
        street: address,
        city,
        country,
        postalcode: postalCode,
        format: "json",
        limit: "1",
    }).toString()}`;
    const geocodingResponse = await axios_1.default.get(geocodingUrl, {
        headers: {
            "User-Agent": "RealEstateApp (justsomedummyemail@gmail.com",
        },
    });
    const [longitude, latitude] = geocodingResponse.data[0]?.lon && geocodingResponse.data[0]?.lat
        ? [
            parseFloat(geocodingResponse.data[0]?.lon),
            parseFloat(geocodingResponse.data[0]?.lat),
        ]
        : [0, 0];
    const [location] = await prisma_1.prisma.$queryRaw `
      INSERT INTO "Location" (address, city, state, country, "postalCode", coordinates)
      VALUES (${address}, ${city}, ${state}, ${country}, ${postalCode}, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
      RETURNING id, address, city, state, country, "postalCode", ST_AsText(coordinates) as coordinates;
    `;
    if (!location) {
        throw new Error("Failed to create location");
    }
    const newProperty = await prisma_1.prisma.property.create({
        data: {
            ...propertyData,
            // photoUrls,
            locationId: location.id,
            managerCognitoId,
            amenities: propertyData.amenities ? propertyData.amenities : [],
            highlights: propertyData.highlights ? propertyData.highlights
                : [],
            isPetsAllowed: propertyData.isPetsAllowed,
            isParkingIncluded: propertyData.isParkingIncluded ? true : false,
            pricePerMonth: Number(propertyData.pricePerMonth),
            securityDeposit: Number(propertyData.securityDeposit),
            applicationFee: Number(propertyData.applicationFee),
            beds: Number(propertyData.beds),
            baths: Number(propertyData.baths),
            squareFeet: Number(propertyData.squareFeet),
        },
        include: {
            location: true,
            manager: true,
        },
    });
};
exports.default = createPropertyService;
//# sourceMappingURL=createPropertyService.js.map