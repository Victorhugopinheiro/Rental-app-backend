import { Request, Response } from "express";
import createPropertyService from "../../services/propeties/createPropertyService";
import { CreatePropertyInput } from "../../types/propertyTypes";
import { PropertyType, Amenity, Highlight } from "@prisma/client";

const createPropertyController = async (req: Request, res: Response): Promise<void> => {

    try {
        const files = req.files as Express.Multer.File[]; 

        const {
            address,
            city,
            state,
            country,
            postalCode,
            managerCognitoId,
            pricePerMonth,
            securityDeposit,
            applicationFee,
            beds,
            baths,
            squareFeet,
            isPetsAllowed,
            isParkingIncluded,
            amenities,
            highlights,
            propertyType,
            name,
            description
        } = req.body

        // Helper to parse boolean
        const parseBoolean = (val: any) => val === 'true' || val === true;
        // Helper to parse number
        const parseNumber = (val: any) => Number(val);

        const input: CreatePropertyInput = {
            address,
            city,
            state,
            country,
            postalCode,
            managerCognitoId,
            name,
            description,
            pricePerMonth: parseNumber(pricePerMonth),
            securityDeposit: parseNumber(securityDeposit),
            applicationFee: parseNumber(applicationFee),
            beds: parseNumber(beds),
            baths: parseNumber(baths),
            squareFeet: parseNumber(squareFeet),
            isPetsAllowed: parseBoolean(isPetsAllowed),
            isParkingIncluded: parseBoolean(isParkingIncluded),
            amenities: amenities ? (typeof amenities === 'string' ? amenities.split(',') as Amenity[] : amenities as Amenity[]) : [],
            highlights: highlights ? (typeof highlights === 'string' ? highlights.split(',') as Highlight[] : highlights as Highlight[]) : [],
            propertyType: propertyType as PropertyType,
            images: files
        };

        const property = await createPropertyService(input);
        
        res.status(201).json(property);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }

}

export default createPropertyController;