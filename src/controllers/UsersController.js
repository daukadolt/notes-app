import express from 'express';

import UserModel from '../models/User.model';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/', async (req, res) => {
    const newUser = UserModel.build(req.body);
    try {
        await newUser.validate();
        await newUser.save();
    } catch (err) {
        console.error(err.stack);
        return res.status(400).send(err.message);
    }

    return res.sendStatus(200);
});

export default router;
