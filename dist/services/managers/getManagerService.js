"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const getManagerService = async ({ cognitoId }) => {
    const manager = await prisma_1.prisma.manager.findUnique({
        where: { cognitoId: cognitoId }
    });
    return manager;
};
exports.default = getManagerService;
//# sourceMappingURL=getManagerService.js.map