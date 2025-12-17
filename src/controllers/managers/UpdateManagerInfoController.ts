import { Request, Response } from "express";
import { UpdateManagerInfoService } from "../../services/managers/UpdateManagerInfoService";

export const UpdateManagerInfoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params
        const { name, email, phoneNumber } = req.body

        if(!cognitoId || name === undefined || email === undefined || phoneNumber === undefined){
            res.status(400).json({message: "Missing required fields"})
            return
        }

        const updatedManager = await UpdateManagerInfoService({ cognitoId, name, email, phoneNumber });

        res.status(200).json(updatedManager);

    } catch (error: any) {
        console.error("Error updating manager info:", error);
        res.status(500).json({ message: `Internal server error` })
    }
}