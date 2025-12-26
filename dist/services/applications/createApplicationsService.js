"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const createApplicationService = async (data) => {
    const property = await prisma_1.prisma.property.findUnique({
        where: { id: data.propertyId }
    });
    if (!property) {
        throw new Error("Property not found");
    }
    const newApplication = await prisma_1.prisma.$transaction(async (prisma) => {
        const lease = await prisma.lease.create({
            data: {
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                deposit: property.securityDeposit,
                rent: property.pricePerMonth,
                property: {
                    connect: {
                        id: property.id
                    }
                },
                tenant: {
                    connect: {
                        cognitoId: data.tenantCognitoId
                    }
                }
            }
        });
        const application = await prisma.application.create({
            data: {
                applicationDate: data.applicationDate,
                status: data.status,
                email: data.email,
                phoneNumber: data.phoneNumber,
                message: data.message || null,
                name: data.name,
                lease: {
                    connect: {
                        id: lease.id
                    }
                },
                property: {
                    connect: {
                        id: property.id
                    }
                },
                tenant: {
                    connect: {
                        cognitoId: data.tenantCognitoId
                    }
                }
            },
            include: {
                lease: true,
                property: true,
                tenant: true
            }
        });
        return application;
    });
    return newApplication;
};
exports.default = createApplicationService;
//# sourceMappingURL=createApplicationsService.js.map