import { Request, Response } from "express";
declare const getPropertyLeasesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default getPropertyLeasesController;
