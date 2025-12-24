"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wkt_1 = require("@terraformer/wkt");
const prisma_1 = require("../../lib/prisma");
const getManagerPropertiesService = async (managerId) => {
    const managerProperies = await prisma_1.prisma.property.findMany({
        where: {
            managerCognitoId: managerId
        },
        include: {
            location: true,
        }
    });
    const ProperiesWithFormateLocation = await Promise.all(managerProperies.map(async (property) => {
        const coordinates = await prisma_1.prisma.$queryRaw `SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property?.locationId}`;
        const geoJson = (0, wkt_1.wktToGeoJSON)(coordinates.coordinates[0] || '');
        const logintude = geoJson?.coordinates[0];
        const latitude = geoJson?.coordinates[1];
        return {
            ...property,
            location: {
                ...property.location,
                coordinates: {
                    longitude: logintude,
                    latitude: latitude
                }
            }
        };
    }));
    return ProperiesWithFormateLocation;
};
exports.default = getManagerPropertiesService;
//# sourceMappingURL=getManagerPropertiesService.js.map