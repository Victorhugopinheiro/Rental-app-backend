import { Request, Response } from "express";
import getProperiesService from "../../services/propeties/getPropetiesService";
import { GetPropertiesQuery } from "../../types/propertyQuery";

const getPropetiesController = (req: Request, res: Response) => {

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

    const resService = getProperiesService({
        amenities, availableFrom, bathrooms, bedrooms, favoriteIds, latitude
        , longitude, priceMax, priceMin, propertyType, squareFeetMax, squareFeetMin
    });

    if (!favoriteIds) {
        return res.status(400).json({ message: "favoriteIds query param is required" })
    }

}