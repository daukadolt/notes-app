import express from 'express';

import AuthController from './controllers/AuthController';
import NotesController from './controllers/notes/NotesController';

const app = express();

app.use(express.json());

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

rootRouter.use('/auth', AuthController);
rootRouter.use('/notes', NotesController);

app.use('/api', rootRouter);

export default app;
