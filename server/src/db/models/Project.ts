import { DataTypes } from 'sequelize';
import { sequelize } from '../connect';
import User from './User';

const Project = sequelize.define(
    "Project",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        leader_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
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
        }
    }
)

User.hasMany(Project, { foreignKey: 'leader_id' });
Project.belongsTo(User, { foreignKey: 'leader_id' });

export default Project