import express from 'express';

import UserController from './controllers/UserController';

const app = express();
const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

rootRouter.use('/users', UserController);

app.use('/api', rootRouter);

export default app;
