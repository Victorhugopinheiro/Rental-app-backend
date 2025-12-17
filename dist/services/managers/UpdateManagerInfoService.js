"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManagerInfoService = void 0;
const prisma_1 = require("../../lib/prisma");
const UpdateManagerInfoService = async ({ cognitoId, name, email, phoneNumber, }) => {
    const updatedManager = await prisma_1.prisma.manager.update({
        where: { cognitoId },
        data: {
            name,
            email,
            phoneNumber,
        },
    });
    return updatedManager;
};
exports.UpdateManagerInfoService = UpdateManagerInfoService;
//# sourceMappingURL=UpdateManagerInfoService.js.map