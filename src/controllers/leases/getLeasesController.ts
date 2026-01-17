import { Request, Response } from 'express';
import getLeasesService from '../../services/leases/getLeasesService';

const getLeasesController = async (req: Request, res: Response) => {


    try {
        const leasesService = await getLeasesService();

        if(!leasesService){
            return res.status(404).json({ message: 'Leases not found' });
        }

        return res.status(200).json({ leasesService });

    }catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }



}

export default getLeasesController;