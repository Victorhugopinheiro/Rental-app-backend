"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createApplicationsService_1 = __importDefault(require("../../services/applications/createApplicationsService"));
const createApplicationController = async (req, res) => {
    try {
        const { applicationDate, status, propertyId, tenantCognitoId, name, email, phoneNumber, message } = req.body;
        const createApplicationSerrvice = await (0, createApplicationsService_1.default)({
            applicationDate,
            status,
            propertyId,
            tenantCognitoId,
            name,
            email,
            phoneNumber,
            message
        });
        res.status(201).json(createApplicationSerrvice);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.default = createApplicationController;
//# sourceMappingURL=createApplicationsController.js.map