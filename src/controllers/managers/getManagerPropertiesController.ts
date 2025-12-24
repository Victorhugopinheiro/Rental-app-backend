import { Request, Response } from "express";
import getManagerPropertiesService from "../../services/managers/getManagerPropertiesService";


const getManagerPropertiesController = async (req: Request, res: Response) => {

    try {
        const { managerId } = req.params;

        if (!managerId) {
            res.status(400).json({ message: "Id do manager é obrigatório" });
        }

        const ProperiesService = await getManagerPropertiesService(managerId!);

        res.status(200).json(ProperiesService);
    }catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}


export default getManagerPropertiesController;