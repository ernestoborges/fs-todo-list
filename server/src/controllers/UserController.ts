import { Request, Response } from 'express';
import User from '../db/models/User';
import { Op } from "sequelize"
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response): Promise<void> => {

    try {
        let { username, password, email } = req.body;

        if (!username || !password || !email) {
            res.status(400).json({ message: "Missing data." })
        }

        const foundUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });

        if (foundUser) {
            res.status(400).json({ message: `${foundUser.username === username ? "Username" : "Email"} is already in use.` })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User created", user: newUser});
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};