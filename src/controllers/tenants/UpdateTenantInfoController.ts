import { Request, Response } from "express";
import { UpdateTenantInfoService } from "../../services/tenants/UpdateTenantInfoService";

export const UpdateTenantInfoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params
        const { name, email, phoneNumber } = req.body

        if(!cognitoId || name === undefined || email === undefined || phoneNumber === undefined){
            res.status(400).json({message: "Missing required fields"})
            return
        }

        const updatedTenant = await UpdateTenantInfoService({ cognitoId, name, email, phoneNumber });

        res.status(200).json(updatedTenant);

    } catch (error: any) {
        console.error("Error updating tenant info:", error);
        res.status(500).json({ message: `Internal server error` })
    }
}