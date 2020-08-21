import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from '../services/UserService';
import Config from '../Config';

class HelperFunctions {
    static passwordIsValid = async (password, hash) => {
        return bcrypt.compare(password, hash);
    };
}

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.sendStatus(400);
    }

    const user = await UserService.getUserByUsername(username);

    if (!user) {
        return res.sendStatus(404);
    }

    const passwordValid = await HelperFunctions.passwordIsValid(password, user.getDataValue('password'));

    if (!passwordValid) {
        return res.sendStatus(400);
    }

    const token = jwt.sign({
        username,
    }, Config.JWT_SECRET, {expiresIn: '1h'});

    res.json(token);
});

export default router;
