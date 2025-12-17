import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import getManagerService from '../../services/managers/getManagerService';



export const getManagerController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params as { cognitoId: string };

        const resService = await getManagerService({cognitoId})

        if(resService){
            res.status(200).json(resService)
        }else{
            res.status(404).json({message: "Manager not found"})
        }
            
    } catch (error: any) {
        console.error("Error getting tenant:", error);
        res.status(500).json({ message: `Internal server error`})
    }



}

export default getManagerController;