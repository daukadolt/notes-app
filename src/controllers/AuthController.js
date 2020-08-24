import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

import authenticate from '../middlewares/authenticate';

import Config from '../Config';
import UserModel from '../models/User.model';

class HelperFunctions {
    static passwordIsValid = async (password, hash) => bcrypt.compare(password, hash);
}

const router = express.Router();

router.post('/signup', async (req, res) => {
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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    const user = await UserService.getUserByUsername(username);

    if (!user) {
        res.sendStatus(404);
        return;
    }

    const passwordValid = await HelperFunctions.passwordIsValid(password, user.getDataValue('password'));

    if (!passwordValid) {
        res.sendStatus(400);
        return;
    }

    const token = jwt.sign({
        username,
    }, Config.JWT_SECRET, { expiresIn: '1h' });

    res.json(token);
});

router.post('/logout', authenticate, async (req, res) => {
    try {
        await AuthService.logoutJWT(req.jwtToken);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send(err.message);
        return;
    }
    res.sendStatus(200);
});

router.post('/logout-all', authenticate, async (req, res) => {
    try {
        await AuthService.logoutAllJWTs(req.jwtToken);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send(err.message);
        return;
    }

    res.sendStatus(200);
});

export default router;
