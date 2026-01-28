import { Request, Response } from 'express';
declare const getLeasesPaymentController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default getLeasesPaymentController;
