import { DataTypes } from 'sequelize';
import { sequelize } from '../connect';
import User from './User';
import Project from './Project';

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        project_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: "Projects",
                key: 'id',
            },
            onUpdate: 'restrict',
            onDelete: 'restrict',
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            defaultValue: null
        },
        status: {
            type: DataTypes.ENUM('todo', 'doing', 'done'),
            allowNull: false,
            defaultValue: 'todo'
        },
        type: {
            type: DataTypes.ENUM('public', 'private'),
            defaultValue: 'public',
        },
    }
)

Project.hasMany(Task, { foreignKey: 'project_id' })
Task.belongsTo(Project, { foreignKey: 'project_id' })

export default Task