import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

const getLeasesPaymentService = async({leaseId}:{leaseId:string}) => {

const leasesPaymentData = await prisma.payment.findMany({
    where: {
        leaseId: Number(leaseId)
    }
})

return leasesPaymentData;

}

export default getLeasesPaymentService;