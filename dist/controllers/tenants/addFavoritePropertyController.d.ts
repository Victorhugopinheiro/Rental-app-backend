import { Request, Response } from "express";
declare const addFavoritePropertyController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default addFavoritePropertyController;
