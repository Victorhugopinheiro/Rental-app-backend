import { Request, Response } from "express";
import updateApplicationIdService from "../../services/applications/updateApplicationIdService";


const updateApplicationIdController = async (req: Request, res: Response) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!applicationId) {
            return res.status(400).json({ message: "ApplicationId é obrigatório" });
        }

        const updateApplicationService = await updateApplicationIdService({ applicationId, status });

        res.status(200).json(updateApplicationService);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}


export default updateApplicationIdController;