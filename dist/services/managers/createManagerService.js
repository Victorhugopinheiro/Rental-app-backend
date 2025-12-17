"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const CreateManagerService = async ({ cognitoId, name, email, phoneNumber }) => {
    const newManager = await prisma_1.prisma.manager.create({
        data: {
            cognitoId,
            name,
            email,
            phoneNumber
        }
    });
    return newManager;
};
exports.default = CreateManagerService;
//# sourceMappingURL=createManagerService.js.map