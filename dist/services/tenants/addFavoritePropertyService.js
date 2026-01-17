"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const addFavoritePropertyService = async ({ cognitoId, propertyId }) => {
    const tenant = await prisma_1.prisma.tenant.findUnique({
        where: { cognitoId },
        include: {
            properties: true
        }
    });
    if (!tenant) {
        throw new Error("Tenant not found");
    }
    const tenantProperties = tenant?.properties || [];
    if (!tenantProperties.some((property) => property.id === propertyId)) {
        const updateProperty = await prisma_1.prisma.tenant.update({
            where: { cognitoId },
            data: {
                favorites: {
                    connect: { id: propertyId }
                }
            },
            include: {
                favorites: true
            }
        });
        return updateProperty;
    }
    else {
        throw new Error("Property already favorited");
    }
};
exports.default = addFavoritePropertyService;
//# sourceMappingURL=addFavoritePropertyService.js.map