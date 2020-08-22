import jwt from 'jsonwebtoken';

import UserService from '../services/UserService';

const getUserByToken = async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        res.sendStatus(403);
        return;
    }
    const [, bearerToken] = bearerHeader.split(' ');

    if (!bearerToken) {
        res.sendStatus(403);
        return;
    }

    let user;

    try {
        const { username, exp } = jwt.decode(bearerToken);
        const dateOfExpiry = new Date(0);
        dateOfExpiry.setUTCSeconds(exp);
        const now = new Date();
        if (dateOfExpiry < now) {
            res.sendStatus(403);
            return;
        }

        user = await UserService.getUserByUsername(username);

        if (!user) {
            res.sendStatus(403);
            return;
        }
    } catch (err) {
        console.error(err.stack);
        res.sendStatus(400);
        return;
    }

    req.jwtToken = bearerToken;
    req.user = user;

    next();
};

export default getUserByToken;
