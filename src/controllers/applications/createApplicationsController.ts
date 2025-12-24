import { Request, Response } from 'express';
import createApplicationService from '../../services/applications/createApplicationsService';

const createApplicationController = async (req: Request, res: Response) => {

    try{
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

    }catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default createApplicationController;