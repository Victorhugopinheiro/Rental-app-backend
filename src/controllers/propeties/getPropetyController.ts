import { Request, Response } from "express";
import getPropetieService from "../../services/propeties/getPropertyService";

const getPropertyController = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Property id is required" });
        }


        
        const resService = await getPropetieService({ id });

         if (!resService) {
            return res.status(404).json({ message: "Property not found" });
        }

        return res.status(200).json(resService);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

export default getPropertyController;