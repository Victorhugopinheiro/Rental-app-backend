import { wktToGeoJSON } from "@terraformer/wkt";
import { prisma } from "../../lib/prisma";


const getCurrentResidencesService = async ({ cognitoId }: { cognitoId: string }) => {


    const tenatResidences = await prisma.property.findMany({
        where: {
            tenants: {
                some: {
                    cognitoId: cognitoId
                }
            },

        },
        include: {
            location: true,
        }
    })


    const residencesWithDetails = await Promise.all(

        tenatResidences.map(async (property) => {
            const coordinates: Array<{ coordinates: string }> = await prisma.$queryRaw`SELECT ST_AsText(coordinates) as coordinates FROM "Location" WHERE id = ${property?.locationId}`

            const coordinatesString = coordinates[0]?.coordinates;

            if (!coordinatesString) {
                throw new Error("Coordinates not found");
            }

            const geoJson: any = wktToGeoJSON(coordinatesString || '');

            const longitude = geoJson?.coordinates[0]
            const latitude = geoJson?.coordinates[1];


            return {
                ...property,
                location: {
                    ...property,
                    coordinates: {
                        longitude: longitude,
                        latitude: latitude
                    }
                }
            }
        })



    )


    return residencesWithDetails;

}

export default getCurrentResidencesService;