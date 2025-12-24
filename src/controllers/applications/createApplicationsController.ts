import { Request, Response } from 'express';
import createApplicationService from '../../services/applications/createApplicationsService';

const createApplicationController = async (req: Request, res: Response) => {

    const {
        applicationDate,
        status,
        propertyId,
        tenantCognitoId,
        name,
        email,
        phoneNumber,
        message
    } = req.body;

    const createApplicationSerrvice = await createApplicationService({
        applicationDate,
        status,
        propertyId,
        tenantCognitoId,
        name,
        email,
        phoneNumber,
        message
    })

}

export default createApplicationController;