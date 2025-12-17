import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';


 const getManagerService = async ({cognitoId}:{cognitoId:string}) => {
   
        

        const manager = await prisma.manager.findUnique({
            where: { cognitoId : cognitoId as string }
            
        })

            return manager
       

}

export default getManagerService;