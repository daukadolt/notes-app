import express from 'express';

import getUserByToken from '../middlewares/getUserByToken';
import NotesService from '../services/NotesService';

const router = express.Router();

router.post('/', getUserByToken, async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.sendStatus(400);
    }

    try {
        await NotesService.createNewNote(req.user, text);
    } catch (err) {
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

export default router;
