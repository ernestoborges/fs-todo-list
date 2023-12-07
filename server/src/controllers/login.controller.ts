import { Request, Response } from 'express';
import User from '../db/models/User';
import { Op } from "sequelize"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const userLogin = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        if (!username || !password ) {
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

        const isPasswordValid = await bcrypt.compare(password ,foundUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credentials do not match.' });
        }

        const token = jwt.sign({ id: foundUser.id }, 'secretpassword');

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: 'Internal error.' });
    }
}