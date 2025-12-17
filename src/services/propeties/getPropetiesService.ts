import { Prisma, PrismaClient } from "@prisma/client";
import { GetPropertiesQuery } from "../../types/propertyQuery";

const prisma = new PrismaClient();

const getProperiesService = ({ amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude
    , longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin

}: GetPropertiesQuery) => {


  


}


export default getProperiesService;