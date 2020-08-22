import express from 'express';

import SharedIDService, { Errors } from '../../services/Note/SharedIDService';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.sendStatus(400);
        }

        const text = await SharedIDService.getNoteTextBySharedID(id);

        res.send(text);
    } catch (err) {
        console.error(err.stack);
        if (err instanceof Errors.NonexistentSharedIDError) return res.sendStatus(404);
        res.status(500).send(err.message);
    }
});

export default router;
