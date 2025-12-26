import { ApplicationStatus } from "@prisma/client";
declare const updateApplicationIdService: ({ applicationId, status }: {
    applicationId: string;
    status: ApplicationStatus;
}) => Promise<({
    property: {
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
    };
    lease: {
        id: number;
        startDate: Date;
        endDate: Date;
        rent: number;
        deposit: number;
        propertyId: number;
        tenantCognitoId: string;
    } | null;
    tenant: {
        name: string;
        id: number;
        cognitoId: string;
        email: string;
        phoneNumber: string;
    };
} & {
    name: string;
    id: number;
    email: string;
    phoneNumber: string;
    propertyId: number;
    tenantCognitoId: string;
    applicationDate: Date;
    status: import(".prisma/client").$Enums.ApplicationStatus;
    message: string | null;
    leaseId: number | null;
}) | null>;
export default updateApplicationIdService;
