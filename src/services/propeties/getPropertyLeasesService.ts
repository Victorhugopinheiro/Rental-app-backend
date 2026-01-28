import { prisma } from "../../lib/prisma"


const getPropertyLeasesService = async (propertyId: number) => {



    const leasesProperty = await prisma.lease.findMany({
        where: {
            propertyId: Number(propertyId)
        }
    })

    return leasesProperty;
}

export default getPropertyLeasesService;