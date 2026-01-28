"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const getUserLeasesService = async ({ userId }) => {
    const userLeases = await prisma_1.prisma.lease.findMany({
        where: {
            tenantCognitoId: userId
        },
        include: {
            property: true,
            tenant: true,
            payments: {
                orderBy: {
                    dueDate: 'desc'
                }
            }
        }
    });
    return userLeases;
};
exports.default = getUserLeasesService;
//# sourceMappingURL=getUserLeasesService.js.map