import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload, JsonWebTokenError } from "jsonwebtoken"

interface AccessTokenPayload extends JwtPayload {
    userId: string;
}

interface CustomRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(401);
        }

        const data = jwt.verify(token, "secret");
        const { id } = data as AccessTokenPayload;
        req.userId = id;

        return next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: "Invalis acess token." });
        }
        return res.status(500).json({ message: "Internal Error." });
    }
}