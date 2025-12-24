import { prisma } from "../../lib/prisma";

const getLeasesService = async () => {

    const leases = await prisma.lease.findMany({
       include: {
        property: true,
        tenant: true
       }
    })

    return leases;

}

export default getLeasesService;