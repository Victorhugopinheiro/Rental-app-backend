import { Request, Response } from 'express';
import getLeasesPaymentService from '../../services/leases/getLeasesPaymentService';

const getLeasesPaymentController = (req: Request, res: Response) => {
    const { leaseId } = req.params;

    if (!leaseId) {
        return res.status(400).json({ message: "LeaseId é obrigatório" });
    }

    const leasesPaymentService = getLeasesPaymentService({leaseId});




}

export default getLeasesPaymentController;