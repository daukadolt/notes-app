import jwt from 'jsonwebtoken';

import UserService from '../services/UserService';

const getUserByToken = async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return res.sendStatus(403);
    }
    const [, bearerToken] = bearerHeader.split(' ');

    if (!bearerToken) {
        return res.sendStatus(403);
    }

    let user;

    try {
        const { username, exp } = jwt.decode(bearerToken);
        const dateOfExpiry = new Date(0);
        dateOfExpiry.setUTCSeconds(exp);
        const now = new Date();
        if (dateOfExpiry < now) {
            return res.sendStatus(403);
        }

        user = await UserService.getUserByUsername(username);

        if (!user) {
            return res.sendStatus(403);
        }

    } catch (err) {
        console.error(err.stack);
        return res.sendStatus(400);
    }

    req.jwtToken = bearerToken;
    req.user = user;

    next();
};

export default getUserByToken;
