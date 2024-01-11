import { DataTypes } from 'sequelize';
import { sequelize } from '../connect';
import User from './User';
import Project from './Project';

const ProjectMember = sequelize.define(
    "ProjectMember",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        project_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Projects",
                key: 'id',
            },
            onUpdate: 'restrict',
            onDelete: 'restrict',
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Users",
                key: 'id',
            },
            onUpdate: 'restrict',
            onDelete: 'restrict',
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
)

Project.hasMany(ProjectMember, { foreignKey: 'project_id' });
ProjectMember.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(ProjectMember, { foreignKey: 'user_id' }); 
ProjectMember.belongsTo(User, { foreignKey: 'user_id' });


export default ProjectMember