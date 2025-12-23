import { Request, Response } from "express";
declare const getPropertiesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default getPropertiesController;
