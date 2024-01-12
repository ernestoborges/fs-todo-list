import { DataTypes } from 'sequelize';
import { sequelize } from '../connect';

const RefreshToken = sequelize.define(
    "RefreshToken",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
        token: {
            type: DataTypes.STRING(512),
            allowNull: false,
            unique: true
        }
    }
)

export default RefreshToken