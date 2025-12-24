import { prisma } from "../../lib/prisma";
import { ApplicationStatus } from "@prisma/client";


const updateApplicationIdService = async ({ applicationId, status }: { applicationId: string, status: ApplicationStatus }) => {

    const application = await prisma.application.findUnique({
        where: { id: Number(applicationId) },
        include: { tenant: true, property: true }
    })

    if (!application) {
        throw new Error("Application not found");
    }


    if (status === "Approved") {
        const updatedApplication = await prisma.$transaction(async (prisma) => {

            const newLease = await prisma.lease.create({
                data: {
                    startDate: new Date(),
                    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    deposit: application.property.securityDeposit,
                    rent: application.property.pricePerMonth,
                    tenant: {
                        connect: {
                            cognitoId: application.tenantCognitoId
                        }
                    },
                    property: {
                        connect: {
                            id: application.propertyId
                        }
                    }

                }
            })


            const updateProperty = await prisma.property.update({
                where: { id: application.propertyId },
                data: {
                    tenants: {
                        connect: {
                            cognitoId: application.tenantCognitoId
                        }
                    }
                }
            })


            const updatedApplication = await prisma.application.update({
                where: {
                    id: Number(applicationId) 
                },
                data:{
                    status: status,
                    leaseId: newLease.id
                },
                include: { tenant: true, property: true }


            })

          

        });
    }else{
        const updatedApplication =  await  prisma.application.update({
            where: {
                id: Number(applicationId)
            },
            data: {
                status: status
            }
        })


    }


    const aplication = await prisma.application.findUnique({
        where: { id: Number(applicationId) },
        include: { tenant: true, property: true, lease: true }
    })

    return  aplication;


}


export default updateApplicationIdService;