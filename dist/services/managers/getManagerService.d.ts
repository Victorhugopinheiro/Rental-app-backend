declare const getManagerService: ({ cognitoId }: {
    cognitoId: string;
}) => Promise<{
    name: string;
    id: number;
    cognitoId: string;
    email: string;
    phoneNumber: string;
} | null>;
export default getManagerService;
