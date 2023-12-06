import * as dotenv from 'dotenv';
const { Sequelize } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL)

sequelize.sync({ logging: false })
    .then(() => {
        console.log('[SEQUELIZE] Tables have been synchronized!');
    })
    .catch((error: any) => {
        console.error('[SEQUELIZE] Error synchronizing tables: ', error);
    });

export { sequelize }