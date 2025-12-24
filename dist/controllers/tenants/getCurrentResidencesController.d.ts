import { Request, Response } from "express";
declare const getCurrentResidencesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default getCurrentResidencesController;
