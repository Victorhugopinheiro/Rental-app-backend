"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (allowedRules) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        try {
            const decodedToken = jsonwebtoken_1.default.decode(token);
            const userRole = decodedToken["custom:role"] || "";
            req.user = {
                id: decodedToken.sub,
                role: userRole
            };
            const hasAccess = allowedRules.includes(userRole.toLowerCase());
            if (!hasAccess) {
                return res.status(403).json({ message: 'Access denied' });
            }
            next();
        }
        catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    };
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map