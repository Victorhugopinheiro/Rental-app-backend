"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const getLeasesPaymentService = async ({ leaseId }) => {
    const leasesPaymentData = await prisma_1.prisma.payment.findMany({
        where: {
            leaseId: Number(leaseId)
        }
    });
    return leasesPaymentData;
};
exports.default = getLeasesPaymentService;
//# sourceMappingURL=getLeasesPaymentService.js.map