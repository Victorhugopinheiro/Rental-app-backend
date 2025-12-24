"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const getLeasesService = async () => {
    const leases = await prisma_1.prisma.lease.findMany({
        include: {
            property: true,
            tenant: true
        }
    });
    return leases;
};
exports.default = getLeasesService;
//# sourceMappingURL=getLeasesService.js.map