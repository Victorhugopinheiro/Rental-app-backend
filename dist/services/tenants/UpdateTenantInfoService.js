"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTenantInfoService = void 0;
const prisma_1 = require("../../lib/prisma");
const UpdateTenantInfoService = async ({ cognitoId, name, email, phoneNumber, }) => {
    const updatedTenant = await prisma_1.prisma.tenant.update({
        where: { cognitoId },
        data: {
            name,
            email,
            phoneNumber,
        },
    });
    return updatedTenant;
};
exports.UpdateTenantInfoService = UpdateTenantInfoService;
//# sourceMappingURL=UpdateTenantInfoService.js.map