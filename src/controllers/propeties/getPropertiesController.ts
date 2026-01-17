import { Request, Response } from "express";
import getProperiesService from "../../services/propeties/getPropertiesService";
import { GetPropertiesQuery } from "../../types/propertyQuery";

const getPropertiesController = async (req: Request, res: Response) => {

    try {
        const {
            favoriteIds,
            priceMin,
            priceMax,
            bedrooms,
            bathrooms,
            availableFrom,
            squareFeetMin,
            squareFeetMax,
            propertyType,
            amenities,
            longitude,
            latitude,
            location

        } = req.query as GetPropertiesQuery;

        const parsedQuery = {
            location: location ? String(location) : undefined,
            priceMin: priceMin ? Number(priceMin) : undefined,
            priceMax: priceMax ? Number(priceMax) : undefined,
            bedrooms: bedrooms ? Number(bedrooms) : undefined,
            bathrooms: bathrooms ? Number(bathrooms) : undefined,
            squareFeetMin: squareFeetMin ? Number(squareFeetMin) : undefined,
            squareFeetMax: squareFeetMax ? Number(squareFeetMax) : undefined,
            latitude: latitude ? Number(latitude) : undefined,
            longitude: longitude ? Number(longitude) : undefined,
            availableFrom: availableFrom ? String(availableFrom) : undefined,
            propertyType: propertyType ? String(propertyType) : undefined,
            // Tratamento especial para arrays separados por vírgula
            amenities: amenities ? (String(amenities).split(",") as any) : undefined,
            favoriteIds: favoriteIds ? String(favoriteIds).split(",").map(Number) : undefined
        };

        const resService = await getProperiesService({
            amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude
            , longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin, location
        });

        return res.status(200).json(resService);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }








}

export default getPropertiesController;