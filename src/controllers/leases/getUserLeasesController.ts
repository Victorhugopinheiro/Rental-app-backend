import { Request, Response } from 'express';
import getUserLeasesService from '../../services/leases/getUserLeasesService';


const getUserLeasesController = async (req: Request, res: Response) => {

    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "UserId é obrigatório" });
        }

        const userLeases = await getUserLeasesService({ userId });

        res.status(200).json({ userLeases });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

}


export default getUserLeasesController;