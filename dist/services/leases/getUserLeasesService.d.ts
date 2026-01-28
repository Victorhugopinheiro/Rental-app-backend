declare const getUserLeasesService: ({ userId }: {
    userId: string;
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
    tenant: {
        name: string;
        id: number;
        cognitoId: string;
        email: string;
        phoneNumber: string;
    };
    payments: {
        id: number;
        leaseId: number;
        amountDue: number;
        amountPaid: number;
        dueDate: Date;
        paymentDate: Date;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
    }[];
} & {
    id: number;
    startDate: Date;
    endDate: Date;
    rent: number;
    deposit: number;
    propertyId: number;
    tenantCognitoId: string;
})[]>;
export default getUserLeasesService;
