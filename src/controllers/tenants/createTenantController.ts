import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import getTenantService from '../../services/tenants/getTenantService';
import CreateTenantService from '../../services/tenants/createTenantService';


export const createTenantController = async (req: Request, res: Response): Promise<void> => {
    try {
        const  { cognitoId, name, email, phoneNumber } = req.body

        const resService = await CreateTenantService({cognitoId, name, email, phoneNumber})

        if(resService){
            res.status(201).json(resService)
        }else{
            res.status(400).json({message: "Error creating tenant"})
        }
            
    } catch (error: any) {
        console.error("Error getting tenant:", error);
        res.status(500).json({ message: `Internal server error`})
    }

}

export default createTenantController;