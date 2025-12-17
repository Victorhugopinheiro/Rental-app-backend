import { prisma } from "../../lib/prisma";



const CreateTenantService = async ({ cognitoId, name, email, phoneNumber }: { cognitoId: string; name: string; email: string; phoneNumber: string }) => {
    const newTenant = await prisma.tenant.create({
        data: {
            cognitoId,
            name,
            email,
            phoneNumber
        }
    })


    return newTenant
}

export default CreateTenantService;