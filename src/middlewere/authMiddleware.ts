import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";


interface DecodedToken extends JwtPayload {
    sub: string
    "custom:role": string
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                role: string
            }
        }
    }
}

const authMiddleware = (allowedRules: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decodedToken = jwt.decode(token as string) as DecodedToken;

            const userRole = decodedToken["custom:role"] || ""

             req.user = {
                id: decodedToken.sub,
                role: userRole
            }

            const hasAccess = allowedRules.includes(userRole.toLowerCase());

            if(!hasAccess) {
                return res.status(403).json({ message: 'Access denied' });
            }

          
            next();

        } catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }



    }

}