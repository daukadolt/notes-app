import express from 'express';

import SharedIDService, { Errors } from '../../services/Note/SharedIDService';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.sendStatus(400);
            return;
        }

        const text = await SharedIDService.getNoteTextBySharedID(id);

        res.send(text);
    } catch (err) {
        console.error(err.stack);
        if (err instanceof Errors.NonexistentSharedIDError) res.sendStatus(404);
        else res.status(500).send(err.message);
    }
});

export default router;
