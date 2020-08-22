import express from 'express';

import SharedIDService from '../../services/Note/SharedIDService';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(400);
    }

    const text = await SharedIDService.getNoteTextBySharedID(id);

    res.send(text);
});

export default router;
