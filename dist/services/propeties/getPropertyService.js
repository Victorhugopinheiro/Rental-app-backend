"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wkt_1 = require("@terraformer/wkt");
const prisma_1 = require("../../lib/prisma");
const getPropertyService = async ({ id }) => {
    const property = await prisma_1.prisma.property.findUnique({
        where: {
            id: Number(id)
        }, include: {
            location: true,
        }
    });
    const coordinates = await prisma_1.prisma.$queryRaw `SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property?.locationId}`;
    const geoJson = (0, wkt_1.wktToGeoJSON)(coordinates.coordinates[0] || '');
    const logintude = geoJson?.coordinates[0];
    const latitude = geoJson?.coordinates[1];
    const properyWithContination = {
        ...property,
        location: {
            ...property?.location,
            coordinates: {
                longitude: logintude,
                latitude: latitude
            }
        }
    };
    return properyWithContination;
};
exports.default = getPropertyService;
//# sourceMappingURL=getPropertyService.js.map