"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const getPropertyLeasesService = async (propertyId) => {
    const leasesProperty = await prisma_1.prisma.lease.findMany({
        where: {
            propertyId: Number(propertyId)
        }
    });
    return leasesProperty;
};
exports.default = getPropertyLeasesService;
//# sourceMappingURL=getPropertyLeasesService.js.map