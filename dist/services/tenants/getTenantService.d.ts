declare const getTenantService: ({ cognitoId }: {
    cognitoId: string;
}) => Promise<({
    favorites: {
        name: string;
        id: number;
        description: string;
        pricePerMonth: number;
        securityDeposit: number;
        applicationFee: number;
        photoUrls: string[];
        amenities: import(".prisma/client").$Enums.Amenity[];
        highlights: import(".prisma/client").$Enums.Highlight[];
        isPetsAllowed: boolean;
        isParkingIncluded: boolean;
        beds: number;
        baths: number;
        squareFeet: number;
        propertyType: import(".prisma/client").$Enums.PropertyType;
        postedDate: Date;
        averageRating: number | null;
        numberOfReviews: number | null;
        locationId: number;
        managerCognitoId: string;
    }[];
} & {
    name: string;
    id: number;
    cognitoId: string;
    email: string;
    phoneNumber: string;
}) | null>;
export default getTenantService;
