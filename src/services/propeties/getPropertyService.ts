import { wktToGeoJSON } from "@terraformer/wkt";
import { prisma } from "../../lib/prisma";

const getPropertyService = async ({id}:{id:string}) => {

    const property = await prisma.property.findUnique({
        where: {
            id: Number(id)
        },include: {
            location: true,
        }
    })

    const coordinates:{coordinates:string[]} = await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property?.locationId}` 

    const geoJson:any = wktToGeoJSON(coordinates.coordinates[0] || '');

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