import bcrypt from 'bcrypt';

import Config from '../Config';

const getPasswordHash = async (password) => bcrypt.hash(password, Config.BCRYPT_SALT);

const timestampToDate = (timestamp) => {
    const result = new Date(0);
    result.setUTCSeconds(timestamp);
    return result;
};

export default {
    timestampToDate,
    getPasswordHash,
};
