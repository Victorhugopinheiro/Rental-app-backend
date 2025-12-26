import { prisma } from "../../lib/prisma";

interface FavoritePropertyService {
    cognitoId: string;
    propertyId: number;
}


const removeFavoritePropertyService = async ({ cognitoId, propertyId }: FavoritePropertyService) => {

    const tenant = await prisma.tenant.findUnique({
        where: { cognitoId },
        include: {
            properties: true
        }
    })

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    const tenantProperties = tenant?.properties || [];


    if (tenantProperties.some((property) => property.id === propertyId)) {

        const removeProperty = await prisma.tenant.update({
            where: { cognitoId },
            data: {
                favorites: {
                    disconnect: { id: propertyId }
                }
            }

        })
        return removeProperty;
    }else{
        throw new Error("Property not in favorites");
    }

}

export default removeFavoritePropertyService;