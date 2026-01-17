import { wktToGeoJSON } from "@terraformer/wkt";
import { prisma } from "../../lib/prisma";

const getPropertyService = async ({ id }: { id: string }) => {

    const property = await prisma.property.findUnique({
        where: {
            id: Number(id)
        }, include: {
            location: true,
        }
    })

    if (!property) {
        throw new Error("Property not found");
    }

    const coordinatesResult: Array<{ coordinates: string }> = await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property?.locationId}`

    const coordinatesString = coordinatesResult[0]?.coordinates;

    if (!coordinatesString) {
        throw new Error("Coordinates not found");
    }

    const geoJson: any = wktToGeoJSON(coordinatesString);

    const logintude = geoJson?.coordinates[0];
    const latitude = geoJson?.coordinates[1];


    const properyWithContination = {
        ...property,
        location: {
            ...property?.location,
            coordinates: {
                longitude: logintude,
                latitude: latitude
            }
        }
    }

    return properyWithContination;


}

export default getPropertyService;