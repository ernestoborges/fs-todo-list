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
        const accessToken = authHeader && authHeader.split(' ')[1];

        if (!accessToken) {
            return res.sendStatus(401);
        }

        const data = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET!);
        const { id } = data as AccessTokenPayload;
        req.userId = id;

        return next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid access token." });
        }
        return res.status(500).json({ message: "Internal Error." });
    }
}