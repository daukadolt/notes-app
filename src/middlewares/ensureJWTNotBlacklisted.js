import redisConnection from '../db/Redis';

export default async (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
        return res.sendStatus(403);
    }

    const [, bearerToken] = bearerHeader.split(' ');

    if (!bearerToken) {
        return res.sendStatus(403);
    }

    const redisRecord = await redisConnection.get(bearerToken);

    console.log('redisRecord', redisRecord);

    if (redisRecord) {
        console.log('blacklisted');
        return res.sendStatus(403);
    }

    next();
};
