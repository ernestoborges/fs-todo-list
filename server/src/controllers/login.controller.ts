import { Request, Response } from 'express';
import User from '../db/models/User';
import { Op } from "sequelize"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import RefreshToken from '../db/models/RefreshToken';
import { CustomRequest } from './common';

export const userLogin = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Missing data." })
        }

        const foundUser = await User.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: username }],
            },
        });

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credentials do not match.' });
        }

        const accessToken = jwt.sign(
            {
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email
            },
            process.env.JWT_TOKEN_SECRET!,
            { expiresIn: '10s' }
        );

        const refreshToken = jwt.sign(
            { id: foundUser.id },
            process.env.JWT_REFRESH_TOKEN_SECRET!,
            { expiresIn: '1d' }
        );

        const existingRefrestToken = await RefreshToken.findOne({ where: { user_id: foundUser.id } });

        if (existingRefrestToken) {
            existingRefrestToken.token = accessToken;
            await existingRefrestToken.save();
        } else {
            await RefreshToken.create({
                user_id: foundUser.id,
                token: accessToken,
            });
        }

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: 'Internal error.' });
    }
}

export const userLogout = async (req: CustomRequest, res: Response) => {

    let { userId } = req
    if (!userId) return res.status(400).json({ message: 'Nome de usuario necessário' });
    const user = await User.findByPk(userId);
    if (!user) return res.status(204).json({ message: `Não encontrado dados do usuario` });

    const foundActiveSession = await RefreshToken.findOne({ where: { user_id: userId } })
    if (!foundActiveSession) return res.status(400).json({message: "Session not found"})

    await foundActiveSession.destroy();

    return res.status(200);
}

export const handleRefreshToken = async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "Token is missing" })

    const activeSession = await RefreshToken.findOne({ token: refreshToken });

    if (!activeSession) return res.status(401).json({ message: "Could not find your session" })

    const user = await User.findByPk(activeSession.user_id);

    if (!user) {
        return res.status(401).json({ message: "Could not find your session" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!, async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err || user.id !== decoded.id) {
            return res.status(403).json({ message: "Refresh token is invalid" });
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_TOKEN_SECRET!,
            { expiresIn: "10s" }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_TOKEN_SECRET!,
            { expiresIn: '1d' }
        );

        activeSession.token = refreshToken
        await activeSession.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    });
}