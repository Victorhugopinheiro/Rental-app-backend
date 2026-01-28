declare const getPropertyLeasesService: (propertyId: number) => Promise<{
    id: number;
    startDate: Date;
    endDate: Date;
    rent: number;
    deposit: number;
    propertyId: number;
    tenantCognitoId: string;
}[]>;
export default getPropertyLeasesService;
