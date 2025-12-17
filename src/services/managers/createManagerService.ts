import { prisma } from "../../lib/prisma";



const CreateManagerService = async ({ cognitoId, name, email, phoneNumber }: { cognitoId: string; name: string; email: string; phoneNumber: string }) => {
    const newManager = await prisma.manager.create({
        data: {
            cognitoId,
            name,
            email,
            phoneNumber
        }
    })


    return newManager
}

export default CreateManagerService;