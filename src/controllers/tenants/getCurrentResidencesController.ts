import { Request, Response } from "express";
import getCurrentResidencesService from "../../services/tenants/getCurrentResidencesService";

const getCurrentResidencesController = async (req: Request, res: Response) => {

    try {
        const { cognitoId } = req.params;

        if (!cognitoId) {
            return res.status(400).json({ message: "CognitoId é Obrigatório" });
        }

        const residenceService = await getCurrentResidencesService({ cognitoId });

        return res.status(200).json(residenceService);
    }catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }



}


export default getCurrentResidencesController;