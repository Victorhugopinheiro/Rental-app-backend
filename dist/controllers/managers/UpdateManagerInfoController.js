"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManagerInfoController = void 0;
const UpdateManagerInfoService_1 = require("../../services/managers/UpdateManagerInfoService");
const UpdateManagerInfoController = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;
        if (!cognitoId || name === undefined || email === undefined || phoneNumber === undefined) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const updatedManager = await (0, UpdateManagerInfoService_1.UpdateManagerInfoService)({ cognitoId, name, email, phoneNumber });
        res.status(200).json(updatedManager);
    }
    catch (error) {
        console.error("Error updating manager info:", error);
        res.status(500).json({ message: `Internal server error` });
    }
};
exports.UpdateManagerInfoController = UpdateManagerInfoController;
//# sourceMappingURL=UpdateManagerInfoController.js.map