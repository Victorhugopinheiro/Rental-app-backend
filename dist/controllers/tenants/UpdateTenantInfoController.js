"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTenantInfoController = void 0;
const UpdateTenantInfoService_1 = require("../../services/tenants/UpdateTenantInfoService");
const UpdateTenantInfoController = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        if (!cognitoId || name === undefined || email === undefined || phoneNumber === undefined) {
            res.status(400).json({ message: "Preencha todos os campos!" });
            return;
        }
        const updatedTenant = await (0, UpdateTenantInfoService_1.UpdateTenantInfoService)({ cognitoId, name, email, phoneNumber });
        res.status(200).json(updatedTenant);
    }
    catch (error) {
        console.error("Error updating tenant info:", error);
        res.status(500).json({ message: `Internal server error` });
    }
};
exports.UpdateTenantInfoController = UpdateTenantInfoController;
//# sourceMappingURL=UpdateTenantInfoController.js.map