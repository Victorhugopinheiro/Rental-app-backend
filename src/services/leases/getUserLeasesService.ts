import { prisma } from "../../lib/prisma"


const getUserLeasesService = async ({ userId }: { userId: string }) => {

    const userLeases = await prisma.lease.findMany({
        where:{
            tenantCognitoId: userId
        },
        include: {
            property: true,
            tenant: true
        }
    })

  

    return userLeases;


}

export default getUserLeasesService;