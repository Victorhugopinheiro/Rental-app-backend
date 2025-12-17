import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';


 const getTenantService = async ({cognitoId}:{cognitoId:string}) => {
   
        

        const tenant = await prisma.tenant.findUnique({
            where: { cognitoId : cognitoId as string },
            include: {
                favorites: true,
            }
            
        })

            return tenant
       

       
    



}

export default getTenantService;