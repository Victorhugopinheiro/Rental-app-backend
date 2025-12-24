import { prisma } from "../../lib/prisma";

interface ListApplicationsService {
    userId: string | number;
    userRole: string;
}

const listApplicationsService = async ({ userId, userRole }: ListApplicationsService) => {

    let whereClause = {}

    if (userRole === 'TENANT') {
        whereClause = {
            tenantCognitoId: String(userId)
        }
    } else {
        whereClause = {
            property: {
                managerCognitoId: String(userId)
            }
        }
    }



    const applications = await prisma.application.findMany({
        where: whereClause,

        include: {
            property: {
                include: {
                    manager: true,
                    location: true
                }
            },
            tenant: true,
            lease: true
        }
    })

    const nextPaymentDate = (startDate: Date) => {
        const today = new Date();
        const nextPayment = new Date(startDate);
        while (nextPayment <= today) {
            nextPayment.setMonth(nextPayment.getMonth() + 1);
        }

    }


    const formattedApplications = applications.map((application) => {

        return {
            ...application,
            property: {
                ...application.property,
                location: application.property.location,
            },
            manager: application.property.manager,
            lease: application.lease ? {
                ...application.lease,
                nextPaymentDate: nextPaymentDate(application.lease.startDate)
            } : null
        }


    })


    return formattedApplications;
}


export default listApplicationsService