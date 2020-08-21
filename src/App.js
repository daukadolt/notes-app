import express from 'express';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const app = express();

app.use(express.json());

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

rootRouter.use('/users', UserController);
rootRouter.use('/auth', AuthController);

app.use('/api', rootRouter);

export default app;
