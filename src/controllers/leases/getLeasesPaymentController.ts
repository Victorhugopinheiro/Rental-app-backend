import { Request, Response } from 'express';
import getLeasesPaymentService from '../../services/leases/getLeasesPaymentService';

const getLeasesPaymentController = async (req: Request, res: Response) => {
    try {
        const { leaseId } = req.params;

        if (!leaseId) {
            return res.status(400).json({ message: "LeaseId é obrigatório" });
        }

        const leasesPaymentService = await getLeasesPaymentService({ leaseId });

        if(!leasesPaymentService){
            return res.status(404).json({ message: 'Lease payments not found' });
        }

        return res.status(200).json({ leasesPaymentService });
    }catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }


}

export default getLeasesPaymentController;