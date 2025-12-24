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

        } = req.query as GetPropertiesQuery;

        if (!favoriteIds) {
            return res.status(400).json({ message: "favoriteIds query param is required" })
        }

        const resService = await getProperiesService({
            amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude
            , longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin
        });

        return res.status(200).json(resService);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }








}

export default getPropertiesController;