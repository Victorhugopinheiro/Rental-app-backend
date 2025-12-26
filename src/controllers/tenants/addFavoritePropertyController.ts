import { Request, Response } from "express";
import addFavoritePropertyService from "../../services/tenants/addFavoritePropertyService";

const addFavoritePropertyController = async (req: Request, res: Response) => {
    try {
        const { cognitoId, propertyId } = req.params;

        if (!cognitoId || !propertyId) {
            return res.status(400).json({ message: "cognitoId and propertyId are required" });
        }

        const favoriteService = await addFavoritePropertyService({ cognitoId, propertyId: Number(propertyId) });

        return res.status(200).json(favoriteService);
    }catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }


    }


export default addFavoritePropertyController;