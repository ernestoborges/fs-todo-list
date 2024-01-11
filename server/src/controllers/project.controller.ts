import Project from "../db/models/Project";
import { Response } from 'express';
import { CustomRequest } from "./common";
import User from "../db/models/User";
import ProjectMember from "../db/models/ProjectMember";
import Task from "../db/models/Task";

export const getUserProjects = async (req: CustomRequest, res: Response) => {
    try {
        let { userId } = req

        const foundProjects = await Project.findAll({ where: { leader_id: userId } })

        return res.status(201).json(foundProjects);
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error });
    }
}

export const getProject = async (req: CustomRequest, res: Response) => {
    try {
        let { userId } = req
        let { routeId } = req.params

        const foundProject = await Project.findOne({ where: { route_id: routeId } })

        const foundTasks = await Task.findAll({ where: { project_id: foundProject.id } })

        const resposeTaskList = foundTasks.map((task: any) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            type: task.type
        }))

        const response = {
            title: foundProject.title,
            description: foundProject.description,
            tasks: resposeTaskList,
            createdAt: foundProject.createdAt
        }

        return res.status(200).json(response);
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

export const newTask = async (req: CustomRequest, res: Response) => {
    try {
        let { userId } = req
        let { routeId } = req.params
        let { title, description, type } = req.body

        const foundProject = await Project.findOne({ where: { route_id: routeId } })
        if (!foundProject) return res.status(400)

        if (foundProject.leader_id !== userId) {
            const foundProjectMember = await ProjectMember.findOne({ where: { project_id: foundProject.id, user_id: userId } })
            if (!foundProjectMember) return res.status(401).json({ message: "You are not a member of this project" })
        }

        const newTask = await Task.create({
            title,
            project_id: foundProject.id,
            description,
            type,
        })

        const response = {
            title: newTask.title,
            description: newTask.description,
            type: newTask.type,
            status: newTask.status,
            createdAt: newTask.createdAt
        }

        return res.status(201).json(response)
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error });
    }
}

export const updateTask = async (req: CustomRequest, res: Response) => {
    try {
        let { userId } = req
        let { routeId, taskId } = req.params
        let { title, description, type, status } = req.body

        const foundProject = await Project.findOne({ where: { route_id: routeId } })
        if (!foundProject) return res.status(400)

        if (foundProject.leader_id !== userId) {
            const foundProjectMember = await ProjectMember.findOne({ where: { project_id: foundProject.id, user_id: userId } })
            if (!foundProjectMember) return res.status(401).json({ message: "You are not a member of this project" })
        }

        const [rowsUpdated, [updateTask]] = await Task.update({
            title,
            description,
            type,
            status
        }, {
            where: {
                id: taskId,
                project_id: foundProject.id
            },
            returning: true,
        })

        if(!rowsUpdated) return res.status(400)

        return res.status(201).json(updateTask)
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error });
    }
}