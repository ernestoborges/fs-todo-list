import Project from "../db/models/Project";
import { Response } from 'express';
import { CustomRequest } from "./common";
import User from "../db/models/User";


export const getProjects = async (req: CustomRequest, res: Response) => {
    console.log("entrei")
    try {
        let { userId } = req

        const foundProjects = await Project.findAll({ where: { leader_id: userId } })

        return res.status(201).json(foundProjects);
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error });
    }
}


export const createProject = async (req: CustomRequest, res: Response) => {
    try {
        let { userId } = req
        let { title, description } = req.body

        if (!title) return res.status(400).json({ message: "Project title is missing." })

        const newProject = await Project.create({
            leader_id: userId,
            title,
            description
        });

        return res.status(201).json({ message: "Project created", project: newProject });
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error });
    }
};

export const deleteProject = async (req: CustomRequest, res: Response) => {
    try {
        let { userId } = req
        let { title } = req.params

        if (!title) return res.status(400).json({ message: "Project title is missing." })

        const foundUser = await User.findByPk(userId, { include: [{ model: Project, where: { title: title.split("-").join(" ") } }] })

        if (foundUser.Projects.length === 0) return res.status(400).json({ message: "Could not find project" });

        await foundUser.Projects[0].destroy()
        return res.status(201).json({ message: "Project deleted" });
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error });
    }
};
