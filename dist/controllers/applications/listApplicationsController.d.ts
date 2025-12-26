import { Request, Response } from "express";
declare const ListApplicationsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default ListApplicationsController;
