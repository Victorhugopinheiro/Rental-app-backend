import { Request, Response } from "express";
import getPropertyLeasesService from "../../services/propeties/getPropertyLeasesService";


const getPropertyLeasesController = async (req: Request, res: Response) => {

    try {
        const { propertyId } = req.params

        if (!propertyId) {
            return res.status(400).json({ message: "PropertyId is required" });
        }

        const propertyIdNumber = Number(propertyId);


        const leasesService = await getPropertyLeasesService(propertyIdNumber);

        res.status(200).json(leasesService);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }



}


export default getPropertyLeasesController;