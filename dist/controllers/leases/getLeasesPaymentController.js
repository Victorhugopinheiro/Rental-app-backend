"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLeasesPaymentService_1 = __importDefault(require("../../services/leases/getLeasesPaymentService"));
const getLeasesPaymentController = (req, res) => {
    const { leaseId } = req.params;
    if (!leaseId) {
        return res.status(400).json({ message: "LeaseId é obrigatório" });
    }
    const leasesPaymentService = (0, getLeasesPaymentService_1.default)({ leaseId });
};
exports.default = getLeasesPaymentController;
//# sourceMappingURL=getLeasesPaymentController.js.map