"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const removeFavoritePropertyService = async ({ cognitoId, propertyId }) => {
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
    if (tenantProperties.some((property) => property.id === propertyId)) {
        const removeProperty = await prisma_1.prisma.tenant.update({
            where: { cognitoId },
            data: {
                favorites: {
                    disconnect: { id: propertyId }
                }
            }
        });
        return removeProperty;
    }
    else {
        throw new Error("Property not in favorites");
    }
};
exports.default = removeFavoritePropertyService;
//# sourceMappingURL=removeFavoritePropertyService.js.map