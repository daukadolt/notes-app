import express from 'express';

import getUserByToken from '../middlewares/getUserByToken';
import NotesService, { Errors } from '../services/NotesService';

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

router.put('/:id', getUserByToken, async (req, res) => {
    const { text } = req.body;
    const { id: noteId } = req.params;

    if (!text) {
        return res.sendStatus(400);
    }

    try {
        await NotesService.setText(noteId, req.user, text);
    } catch (err) {
        if (err instanceof Errors.NonexistentNote) return res.sendStatus(401);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

export default router;
