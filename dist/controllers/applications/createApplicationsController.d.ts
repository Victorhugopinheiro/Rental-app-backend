import { Request, Response } from 'express';
declare const createApplicationController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default createApplicationController;
