import app from './App';
import Config from './Config';

import sequelize from './db/Sequelize';
import initModels from './models/init';

const start = async () => {
    try {
        await sequelize.authenticate();
        await initModels(sequelize);
        app.listen(Config.EXPRESS_PORT, () => {
            console.log(`App running on http://localhost:${Config.EXPRESS_PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to postgres', err);
        process.exit(1);
    }
};

start();
