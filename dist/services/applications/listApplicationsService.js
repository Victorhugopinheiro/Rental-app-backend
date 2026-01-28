"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const listApplicationsService = async ({ userId, userRole }) => {
    let whereClause = {};
    if (userRole === 'TENANT') {
        whereClause = {
            tenantCognitoId: String(userId)
        };
    }
    else {
        whereClause = {
            property: {
                managerCognitoId: String(userId)
            }
        };
    }
    const applications = await prisma_1.prisma.application.findMany({
        where: whereClause,
        include: {
            property: {
                include: {
                    manager: true,
                    location: true
                }
            },
            tenant: true,
            lease: true
        }
    });
    const nextPaymentDate = (startDate) => {
        const today = new Date();
        const nextPayment = new Date(startDate);
        while (nextPayment <= today) {
            nextPayment.setMonth(nextPayment.getMonth() + 1);
        }
        return nextPayment;
    };
    const formattedApplications = applications.map((application) => {
        return {
            ...application,
            property: {
                ...application.property,
                location: application.property.location,
            },
            manager: application.property.manager,
            lease: application.lease ? {
                ...application.lease,
                nextPaymentDate: nextPaymentDate(application.lease.startDate)
            } : null
        };
    });
    return formattedApplications;
};
exports.default = listApplicationsService;
//# sourceMappingURL=listApplicationsService.js.map