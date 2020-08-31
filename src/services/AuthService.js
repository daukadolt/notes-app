import jwt from 'jsonwebtoken';

import blacklistRedis from '../db/Redis';
import db from '../db/Sequelize';

import utils from '../utils';

const User = db.User;

const jwtBlacklisted = async (token) => {
    const { iat, username } = jwt.decode(token);

    const issuedDate = utils.timestampToDate(iat);

    const user = await User.findOne({ where: { username } });

    if (!user) {
        // TODO: custom errors
        throw new Error('user does not exist');
    }

    const jwtValidFrom = new Date(user.jwtValidFrom);
    jwtValidFrom.setMilliseconds(0);

    if (issuedDate < jwtValidFrom) {
        return true;
    }

    const pairValue = await blacklistRedis.get(token);
    return pairValue !== null;
};

const logoutJWT = async (jwtToken) => {
    const { exp } = jwt.decode(jwtToken);

    const dateOfExpiry = new Date(0);
    dateOfExpiry.setUTCSeconds(exp);
    const now = new Date();

    if (now > dateOfExpiry) return;

    const secondsLeft = Math.ceil((dateOfExpiry.getTime() - now.getTime()) / 1000);

    await blacklistRedis.set(jwtToken, 'X', 'NX', 'EX', secondsLeft);
};

const logoutAllJWTs = async (token) => {
    const { username } = jwt.decode(token);

    const user = await User.findOne({ where: { username } });

    if (!user) {
        // TODO: custom errors
        throw new Error('user does not exist');
    }

    user.jwtValidFrom = new Date();

    await user.save();
};

export default {
    jwtBlacklisted,
    logoutJWT,
    logoutAllJWTs,
};
