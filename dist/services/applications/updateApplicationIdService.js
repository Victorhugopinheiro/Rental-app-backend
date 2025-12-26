"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const updateApplicationIdService = async ({ applicationId, status }) => {
    const application = await prisma_1.prisma.application.findUnique({
        where: { id: Number(applicationId) },
        include: { tenant: true, property: true }
    });
    if (!application) {
        throw new Error("Application not found");
    }
    if (status === "Approved") {
        const updatedApplication = await prisma_1.prisma.$transaction(async (prisma) => {
            const newLease = await prisma.lease.create({
                data: {
                    startDate: new Date(),
                    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    deposit: application.property.securityDeposit,
                    rent: application.property.pricePerMonth,
                    tenant: {
                        connect: {
                            cognitoId: application.tenantCognitoId
                        }
                    },
                    property: {
                        connect: {
                            id: application.propertyId
                        }
                    }
                }
            });
            const updateProperty = await prisma.property.update({
                where: { id: application.propertyId },
                data: {
                    tenants: {
                        connect: {
                            cognitoId: application.tenantCognitoId
                        }
                    }
                }
            });
            const updatedApplication = await prisma.application.update({
                where: {
                    id: Number(applicationId)
                },
                data: {
                    status: status,
                    leaseId: newLease.id
                },
                include: { tenant: true, property: true }
            });
        });
    }
    else {
        const updatedApplication = await prisma_1.prisma.application.update({
            where: {
                id: Number(applicationId)
            },
            data: {
                status: status
            }
        });
    }
    const aplication = await prisma_1.prisma.application.findUnique({
        where: { id: Number(applicationId) },
        include: { tenant: true, property: true, lease: true }
    });
    return aplication;
};
exports.default = updateApplicationIdService;
//# sourceMappingURL=updateApplicationIdService.js.map