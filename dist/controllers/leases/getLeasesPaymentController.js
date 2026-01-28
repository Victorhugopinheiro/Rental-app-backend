"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLeasesPaymentService_1 = __importDefault(require("../../services/leases/getLeasesPaymentService"));
const getLeasesPaymentController = async (req, res) => {
    try {
        const { leaseId } = req.params;
        if (!leaseId) {
            return res.status(400).json({ message: "LeaseId é obrigatório" });
        }
        const leasesPaymentService = await (0, getLeasesPaymentService_1.default)({ leaseId });
        if (!leasesPaymentService) {
            return res.status(404).json({ message: 'Lease payments not found' });
        }
        return res.status(200).json({ leasesPaymentService });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.default = getLeasesPaymentController;
//# sourceMappingURL=getLeasesPaymentController.js.map