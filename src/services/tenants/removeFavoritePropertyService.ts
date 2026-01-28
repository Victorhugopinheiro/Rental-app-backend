import { prisma } from "../../lib/prisma";

interface FavoritePropertyService {
    cognitoId: string;
    propertyId: number;
}


const removeFavoritePropertyService = async ({ cognitoId, propertyId }: FavoritePropertyService) => {

    const tenant = await prisma.tenant.findUnique({
        where: { cognitoId },
        include: {
            properties: true,
            favorites: true
        }
    })

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    const tenantProperties = tenant?.favorites || [];


    if (tenantProperties.some((property) => property.id === propertyId)) {

        const removeProperty = await prisma.tenant.update({
            where: { cognitoId },
            data: {
                favorites: {
                    disconnect: { id: propertyId }
                }
            },
            include: {favorites: true}

        })
        return removeProperty;
    }else{
        throw new Error("Property not in favorites");
    }

}

export default removeFavoritePropertyService;