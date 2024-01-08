import { Request, Response } from 'express';
import User from '../db/models/User';
import { Op } from "sequelize"
import bcrypt from 'bcrypt';

interface CustomRequest extends Request {
    userId?: string;
}

export const createUser = async (req: Request, res: Response) => {
    try {
        let { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Missing data." })
        }

        const foundUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });

        if (foundUser) {
            return res.status(400).json({ message: `${foundUser.username === username ? "Username" : "Email"} is already in use.` })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};

export const getUserData = async (req: CustomRequest, res: Response) => {

    let { userId } = req

    if (!userId) return res.status(400).json({ message: 'Nome de usuario necessário' });

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(204).json({ message: `Não encontrado dados do usuario` });
    }

    const data = {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
    }

    return res.status(200).json(data);
};