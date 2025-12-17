"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const CreateTenantService = async ({ cognitoId, name, email, phoneNumber }) => {
    const newTenant = await prisma_1.prisma.tenant.create({
        data: {
            cognitoId,
            name,
            email,
            phoneNumber
        }
    });
    return newTenant;
};
exports.default = CreateTenantService;
//# sourceMappingURL=createTenantService.js.map