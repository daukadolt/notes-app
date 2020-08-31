import app from './App';
import Config from './Config';

import db from './db/Sequelize';

const start = async () => {
    try {
        await db.sequelize.authenticate();
        app.listen(Config.EXPRESS_PORT, () => {
            console.log(`App running on http://localhost:${Config.EXPRESS_PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to postgres', err);
        process.exit(1);
    }
};

start();
