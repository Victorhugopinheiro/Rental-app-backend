"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const getTenantService = async ({ cognitoId }) => {
    const tenant = await prisma_1.prisma.tenant.findUnique({
        where: { cognitoId: cognitoId },
        include: {
            favorites: true,
        }
    });
    return tenant;
};
exports.default = getTenantService;
//# sourceMappingURL=getTenantService.js.map