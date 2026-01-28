import { wktToGeoJSON } from "@terraformer/wkt";
import { prisma } from "../../lib/prisma";



const getManagerPropertiesService = async (managerId: string) => {

    const managerProperies = await prisma.property.findMany({
        where: {
            managerCognitoId: managerId
        },
        include: {
            location: true,
        }
    })


    const ProperiesWithFormateLocation = await Promise.all(

        managerProperies.map(async (property) => {
            const coordinates: Array<{ coordinates: string }> = await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property?.locationId}`

            const coordinatesString = coordinates[0]?.coordinates;

            if (!coordinatesString) {
                throw new Error("Coordinates not found");
            }

            const geoJson: any = wktToGeoJSON(coordinatesString || '');

            const logintude = geoJson?.coordinates[0];
            const latitude = geoJson?.coordinates[1];

            return {
                ...property,
                location: {
                    ...property.location,
                    coordinates: {
                        longitude: logintude,
                        latitude: latitude
                    }
                }
            }
        })
    )

    return ProperiesWithFormateLocation;

}


export default getManagerPropertiesService;