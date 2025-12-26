interface ListApplicationsService {
    userId: string | number;
    userRole: string;
}
declare const listApplicationsService: ({ userId, userRole }: ListApplicationsService) => Promise<{
    property: {
        location: {
            id: number;
            address: string;
            city: string;
            state: string;
            country: string;
            postalCode: string;
        };
        manager: {
            name: string;
            id: number;
            cognitoId: string;
            email: string;
            phoneNumber: string;
        };
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
    manager: {
        name: string;
        id: number;
        cognitoId: string;
        email: string;
        phoneNumber: string;
    };
    lease: {
        nextPaymentDate: void;
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
}[]>;
export default listApplicationsService;
