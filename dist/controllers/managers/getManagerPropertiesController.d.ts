import { Request, Response } from "express";
declare const getManagerPropertiesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default getManagerPropertiesController;
