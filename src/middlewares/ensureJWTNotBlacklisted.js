import AuthService from '../services/AuthService';


export default async (req, res, next) => {
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

    let isBlacklisted;

    try {
        isBlacklisted = await AuthService.jwtBlacklisted(bearerToken);
    } catch (err) {
        // TODO: custom errors
        console.error(err.stack);
        res.sendStatus(403);
        return;
    }

    if (isBlacklisted) {
        res.sendStatus(403);
        return;
    }

    next();
};
