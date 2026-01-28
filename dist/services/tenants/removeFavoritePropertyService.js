"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const removeFavoritePropertyService = async ({ cognitoId, propertyId }) => {
    const tenant = await prisma_1.prisma.tenant.findUnique({
        where: { cognitoId },
        include: {
            properties: true,
            favorites: true
        }
    });
    if (!tenant) {
        throw new Error("Tenant not found");
    }
    const tenantProperties = tenant?.favorites || [];
    if (tenantProperties.some((property) => property.id === propertyId)) {
        const removeProperty = await prisma_1.prisma.tenant.update({
            where: { cognitoId },
            data: {
                favorites: {
                    disconnect: { id: propertyId }
                }
            },
            include: { favorites: true }
        });
        return removeProperty;
    }
    else {
        throw new Error("Property not in favorites");
    }
};
exports.default = removeFavoritePropertyService;
//# sourceMappingURL=removeFavoritePropertyService.js.map