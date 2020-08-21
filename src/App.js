import express from 'express';

import UserController from './controllers/UsersController';
import AuthController from './controllers/AuthController';
import NotesController from './controllers/NotesController';

const app = express();

app.use(express.json());

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

rootRouter.use('/users', UserController);
rootRouter.use('/auth', AuthController);
rootRouter.use('/notes', NotesController);

app.use('/api', rootRouter);

export default app;
