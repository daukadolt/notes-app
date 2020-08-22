import redisConnection from '../db/Redis';

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

    const redisRecord = await redisConnection.get(bearerToken);

    if (redisRecord) {
        res.sendStatus(403);
        return;
    }

    next();
};
