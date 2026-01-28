import { Request, Response } from 'express';
declare const getUserLeasesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default getUserLeasesController;
