import { Request, Response } from "express";
import listApplicationsService from "../../services/applications/listApplicationsService";


const ListApplicationsController = async (req: Request, res:Response) => {
    try {
        const {userId, userRole} = req.query as {userId: string | number, userRole: string};

        const applications = await listApplicationsService({userId, userRole});
        return res.status(200).json(applications);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export default ListApplicationsController;