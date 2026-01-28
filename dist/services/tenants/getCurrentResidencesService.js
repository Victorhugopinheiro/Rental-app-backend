"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wkt_1 = require("@terraformer/wkt");
const prisma_1 = require("../../lib/prisma");
const getCurrentResidencesService = async ({ cognitoId }) => {
    const tenatResidences = await prisma_1.prisma.property.findMany({
        where: {
            tenants: {
                some: {
                    cognitoId: cognitoId
                }
            },
        },
        include: {
            location: true,
        }
    });
    const residencesWithDetails = await Promise.all(tenatResidences.map(async (property) => {
        const coordinates = await prisma_1.prisma.$queryRaw `SELECT ST_AsText(coordinates) as coordinates FROM "Location" WHERE id = ${property?.locationId}`;
        const coordinatesString = coordinates[0]?.coordinates;
        if (!coordinatesString) {
            throw new Error("Coordinates not found");
        }
        const geoJson = (0, wkt_1.wktToGeoJSON)(coordinatesString || '');
        const longitude = geoJson?.coordinates[0];
        const latitude = geoJson?.coordinates[1];
        return {
            ...property,
            location: {
                ...property,
                coordinates: {
                    longitude: longitude,
                    latitude: latitude
                }
            }
        };
    }));
    return residencesWithDetails;
};
exports.default = getCurrentResidencesService;
//# sourceMappingURL=getCurrentResidencesService.js.map