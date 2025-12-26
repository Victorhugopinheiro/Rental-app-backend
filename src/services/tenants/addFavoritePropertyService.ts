import { prisma } from "../../lib/prisma";

interface FavoritePropertyService {
    cognitoId: string;
    propertyId: number;
}

const addFavoritePropertyService = async ({ cognitoId, propertyId }: FavoritePropertyService) => {

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


    if (!tenantProperties.some((property) => property.id === propertyId)) {

        const updateProperty = await prisma.tenant.update({
            where: { cognitoId },
            data: {
                favorites: {
                    connect: { id: propertyId }
                }
            },
            include: {
                favorites: true
            }
        })



        return updateProperty;

    }else{
        throw new Error("Property already favorited");
    }


}

export default addFavoritePropertyService;