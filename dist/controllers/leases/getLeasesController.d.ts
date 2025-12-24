import { Request, Response } from 'express';
declare const getLeasesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default getLeasesController;
