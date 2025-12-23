"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_1 = require("../../lib/prisma");
const getProperiesService = async ({ amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude, longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin }) => {
    let whereConditions = [];
    if (favoriteIds) {
        const favoritesIdsArray = favoriteIds.split(",").map(Number);
        whereConditions.push(client_1.Prisma.sql `p.id IN (${client_1.Prisma.join(favoritesIdsArray)})`);
    }
    if (priceMin) {
        whereConditions.push(client_1.Prisma.sql `p."pricePerMonth" >= ${Number(priceMin)}`);
    }
    if (priceMax) {
        whereConditions.push(client_1.Prisma.sql `p."pricePerMonth" <= ${Number(priceMax)}`);
    }
    if (bedrooms) {
        whereConditions.push(client_1.Prisma.sql `p.beds >= ${Number(bedrooms)}`);
    }
    if (bathrooms) {
        whereConditions.push(client_1.Prisma.sql `p.baths >= ${Number(bathrooms)}`);
    }
    if (squareFeetMin) {
        whereConditions.push(client_1.Prisma.sql `p."squareFeet" >= ${Number(squareFeetMin)}`);
    }
    if (squareFeetMax) {
        whereConditions.push(client_1.Prisma.sql `p."squareFeet" >= ${Number(squareFeetMax)}`);
    }
    if (propertyType) {
        whereConditions.push(client_1.Prisma.sql `p."propertyType" = ${propertyType}::"PropertyType"`);
    }
    if (amenities) {
        const amenitiesArray = amenities.split(",");
        whereConditions.push(client_1.Prisma.sql `p.amenities @> ${amenitiesArray}::"Amenity"[]`);
    }
    if (availableFrom && availableFrom !== "any") {
        const availableFromDate = typeof availableFrom === "string" ? availableFrom : null;
        if (availableFromDate) {
            const date = new Date(availableFromDate);
            if (!isNaN(date.getTime())) {
                whereConditions.push(client_1.Prisma.sql `EXISTS (
              SELECT 1 FROM "Lease" l 
              WHERE l."propertyId" = p.id 
              AND l."startDate" <= ${date.toISOString()}
            )`);
            }
        }
    }
    if (latitude && longitude) {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const radiusInKilometers = 1000;
        const degrees = radiusInKilometers / 111; // Converts kilometers to degrees
        whereConditions.push(client_1.Prisma.sql `ST_DWithin(
          l.coordinates::geometry,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${degrees}
        )`);
    }
    const completeQuery = client_1.Prisma.sql `
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'city', l.city,
          'state', l.state,
          'country', l.country,
          'postalCode', l."postalCode",
          'coordinates', json_build_object(
            'longitude', ST_X(l."coordinates"::geometry),
            'latitude', ST_Y(l."coordinates"::geometry)
          )
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${whereConditions.length > 0
        ? client_1.Prisma.sql `WHERE ${client_1.Prisma.join(whereConditions, " AND ")}`
        : client_1.Prisma.empty}
    `;
    const properties = await prisma_1.prisma.$queryRaw(completeQuery);
    return properties;
};
exports.default = getProperiesService;
//# sourceMappingURL=getPropertiesService.js.map