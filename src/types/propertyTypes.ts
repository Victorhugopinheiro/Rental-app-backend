import { Property, PropertyType, Amenity, Highlight } from "@prisma/client";

export interface CreatePropertyInput {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  managerCognitoId: string;
  name: string;
  description: string;
  pricePerMonth: number;
  securityDeposit: number;
  applicationFee: number;
  amenities: Amenity[];
  highlights: Highlight[];
  isPetsAllowed: boolean;
  isParkingIncluded: boolean;
  beds: number;
  baths: number;
  squareFeet: number;
  propertyType: PropertyType;
  images: Express.Multer.File[];
}

export interface CreatePropertyOutput extends Property {}
