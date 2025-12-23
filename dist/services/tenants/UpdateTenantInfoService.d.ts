export declare const UpdateTenantInfoService: ({ cognitoId, name, email, phoneNumber, }: {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
}) => Promise<{
    name: string;
    id: number;
    cognitoId: string;
    email: string;
    phoneNumber: string;
}>;
