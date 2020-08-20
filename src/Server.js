import { Sequelize } from 'sequelize';

import app from './App';
import Config from './Config';

const db = new Sequelize(
    Config.DB_NAME,
    Config.DB_USERNAME,
    Config.DB_PASSWORD, {
        host: Config.DB_HOST,
        dialect: 'postgres',
    },
);

const initModels = async () => {
    await db.sync({ force: true, alter: true });
};

const start = async () => {
    try {
        await db.authenticate();
        await initModels();
        app.listen(Config.EXPRESS_PORT, () => {
            console.log(`App running on http://localhost:${Config.EXPRESS_PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to postgres', err);
        process.exit(1);
    }
};

start();
