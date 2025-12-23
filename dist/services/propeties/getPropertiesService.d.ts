import { GetPropertiesQuery } from "../../types/propertyQuery";
declare const getProperiesService: ({ amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude, longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin }: GetPropertiesQuery) => Promise<unknown>;
export default getProperiesService;
