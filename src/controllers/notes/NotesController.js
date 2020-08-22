import express from 'express';

import authenticate from '../../middlewares/authenticate';
import NotesService, { Errors } from '../../services/Note/NotesService';
import SharedIDService from '../../services/Note/SharedIDService';

import SharedNotesController from './SharedNotesController';

const router = express.Router();

router.use('/shared', SharedNotesController);

class HelperFunctions {
    static flattenNestedSharedIDs = (SharedIDs) => SharedIDs.map(({ id }) => id);
}

router.get('/', authenticate, async (req, res) => {
    const notes = await NotesService.getAllNoteIdsByAuthor(req.user);
    res.json(notes);
});

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.sendStatus(400);
        return;
    }

    const note = await NotesService.getNoteByAuthorAndId(req.user, id);

    if (!note) {
        res.sendStatus(403);
        return;
    }

    note.SharedIDs = HelperFunctions.flattenNestedSharedIDs(note.SharedIDs);

    res.json(note);
});

router.post('/', authenticate, async (req, res) => {
    const { text } = req.body;

    if (!text) {
        res.sendStatus(400);
        return;
    }

    let note;

    try {
        note = await NotesService.createNewNote(req.user, text);
    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
        return;
    }

    res.json(note);
});

router.post('/:id/share', authenticate, async (req, res) => {
    const { id: noteId } = req.params;

    if (!noteId) {
        res.sendStatus(400);
        return;
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
        res.sendStatus(400);
        return;
    }

    try {
        await NotesService.setText(noteId, req.user, text);
    } catch (err) {
        if (err instanceof Errors.NonexistentNoteError) res.sendStatus(401);
        else res.sendStatus(500);
        return;
    }

    res.sendStatus(200);
});

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.sendStatus(400);
        return;
    }

    const deleteCount = await NotesService.deleteNoteById(req.user, id);

    if (deleteCount === 0) {
        res.sendStatus(404);
        return;
    }

    res.sendStatus(200);
});

export default router;
