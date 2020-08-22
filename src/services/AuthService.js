import jwt from 'jsonwebtoken';

import redisConnection from '../db/Redis';

const logoutJWT = async (jwtToken) => {
    console.log(jwtToken);
    const { exp } = jwt.decode(jwtToken);

    const dateOfExpiry = new Date(0);
    dateOfExpiry.setUTCSeconds(exp);
    const now = new Date();

    if (now > dateOfExpiry) return;

    const secondsLeft = Math.ceil( (dateOfExpiry.getTime() - now.getTime()) / 1000 );

    await redisConnection.set(jwtToken, 'X', 'NX', 'EX', secondsLeft);
};


export default {
    logoutJWT,
};
