import { Prisma, PrismaClient } from "@prisma/client";
import { GetPropertiesQuery } from "../../types/propertyQuery";
import { prisma } from "../../lib/prisma";



const getProperiesService = async ({ amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude
    , longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin, location

}: GetPropertiesQuery) => {


    let whereConditions: Prisma.Sql[] = []

    if (favoriteIds) {
        const favoritesIdsArray = (favoriteIds as string).split(",").map(Number);

        whereConditions.push(
            Prisma.sql`p.id IN (${Prisma.join(favoritesIdsArray)})`
        )
    }

    if (priceMin) {
        whereConditions.push(
            Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
        )
    }

    if (priceMax) {
        whereConditions.push(
            Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
        )
    }

    if (bedrooms) {
        whereConditions.push(
            Prisma.sql`p.beds >= ${Number(bedrooms)}`
        )
    }

    if (bathrooms) {
        whereConditions.push(
            Prisma.sql`p.baths >= ${Number(bathrooms)}`
        )
    }

    if (squareFeetMin) {
        whereConditions.push(
            Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
        )
    }

    if (squareFeetMax) {
        whereConditions.push(
            Prisma.sql`p."squareFeet" >= ${Number(squareFeetMax)}`
        )
    }

    if (propertyType) {
        whereConditions.push(
            Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
        )
    }

    if (amenities) {
        const amenitiesArray = (amenities as string).split(",");
        whereConditions.push(
            Prisma.sql`p.amenities @> ${amenitiesArray}::"Amenity"[]`
        )

    }


    if (availableFrom && availableFrom !== "any") {
        const availableFromDate =
            typeof availableFrom === "string" ? availableFrom : null;
        if (availableFromDate) {
            const date = new Date(availableFromDate);
            if (!isNaN(date.getTime())) {
                whereConditions.push(
                    Prisma.sql`EXISTS (
              SELECT 1 FROM "Lease" l 
              WHERE l."propertyId" = p.id 
              AND l."startDate" <= ${date.toISOString()}
            )`
                );
            }
        }
    }


    if (latitude && longitude) {
        const lat = parseFloat(latitude as string);
        const lng = parseFloat(longitude as string);
        const radiusInKilometers = 1000;
        const degrees = radiusInKilometers / 111; // Converts kilometers to degrees

        whereConditions.push(
            Prisma.sql`ST_DWithin(
          l.coordinates::geometry,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${degrees}
        )`
        );
    }


    const completeQuery = Prisma.sql`
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'city', l.city,
          'state', l.state,
          'country', l.country,
          'postalCode', l."postalCode",
          'coordinates', json_build_object(
            'longitude', ST_X(l."coordinates"::geometry),
            'latitude', ST_Y(l."coordinates"::geometry)
          )
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${whereConditions.length > 0
            ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
            : Prisma.empty
        }
    `;

    const properties = await prisma.$queryRaw(completeQuery);

   return properties;

}


export default getProperiesService;