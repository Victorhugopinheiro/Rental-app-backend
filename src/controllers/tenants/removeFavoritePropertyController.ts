import { Request, Response } from 'express';
import removeFavoritePropertyService from '../../services/tenants/removeFavoritePropertyService';

const removeFavoritePropertyController = async (req: Request, res: Response) => {

    try {
        const { cognitoId, propertyId } = req.params;

        if (!cognitoId || !propertyId) {
            return res.status(400).json({ message: "cognitoId and propertyId are required" });
        }

        const removeFavoriteService = await removeFavoritePropertyService({ cognitoId, propertyId: Number(propertyId) });


        return res.status(200).json(removeFavoriteService);
    }catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export default removeFavoritePropertyController;