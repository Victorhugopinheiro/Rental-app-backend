import { Request, Response } from 'express';
import getLeasesPaymentService from '../../services/leases/getLeasesPaymentService';

const getLeasesPaymentController = (req: Request, res: Response) => {
    try {
        const { leaseId } = req.params;

        if (!leaseId) {
            return res.status(400).json({ message: "LeaseId é obrigatório" });
        }

        const leasesPaymentService = getLeasesPaymentService({ leaseId });

        return res.status(200).json({ leasesPaymentService });
    }catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }


}

export default getLeasesPaymentController;