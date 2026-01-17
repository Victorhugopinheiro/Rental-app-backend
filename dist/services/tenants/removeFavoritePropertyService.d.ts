interface FavoritePropertyService {
    cognitoId: string;
    propertyId: number;
}
declare const removeFavoritePropertyService: ({ cognitoId, propertyId }: FavoritePropertyService) => Promise<{
    name: string;
    id: number;
    cognitoId: string;
    email: string;
    phoneNumber: string;
}>;
export default removeFavoritePropertyService;
