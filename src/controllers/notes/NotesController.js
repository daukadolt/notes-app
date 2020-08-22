import express from 'express';

import authenticate from '../../middlewares/authenticate';
import NotesService, { Errors } from '../../services/Note/NotesService';
import SharedIDService from '../../services/Note/SharedIDService';

import SharedNotesController from './SharedNotesController';

const router = express.Router();

router.use('/shared', SharedNotesController);

class HelperFunctions {
    static flattenNestedSharedIDs = (SharedIDs) => {
        return SharedIDs.map(({ id }) => id);
    };
}

router.get('/', authenticate, async (req, res) => {
    const notes = await NotesService.getAllNoteIdsByAuthor(req.user);
    res.json(notes);
});

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(400);
    }

    const note = await NotesService.getNoteByAuthorAndId(req.user, id);

    if (!note) {
        return res.sendStatus(403);
    }

    note.SharedIDs = HelperFunctions.flattenNestedSharedIDs(note.SharedIDs);

    res.json(note);
});

router.post('/', authenticate, async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.sendStatus(400);
    }

    try {
        await NotesService.createNewNote(req.user, text);
    } catch (err) {
        console.error(err.stack);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

router.post('/:id/share', authenticate, async (req, res) => {
    const { id: noteId } = req.params;

    if (!noteId) {
        return res.sendStatus(400);
    }

    try {
        const sharedId = await SharedIDService.createNoteSharedID(noteId);
        res.send(sharedId);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send(err.message);
    }
});

router.put('/:id', authenticate, async (req, res) => {
    const { text } = req.body;
    const { id: noteId } = req.params;

    if (!text) {
        return res.sendStatus(400);
    }

    try {
        await NotesService.setText(noteId, req.user, text);
    } catch (err) {
        if (err instanceof Errors.NonexistentNoteError) return res.sendStatus(401);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(400);
    }

    const deleteCount = await NotesService.deleteNoteById(req.user, id);

    if (deleteCount === 0) {
        return res.sendStatus(404);
    }

    res.sendStatus(200);
});

export default router;
