import bcrypt from 'bcrypt';

import Config from '../Config';

const getPasswordHash = async (password) => bcrypt.hash(password, Config.BCRYPT_SALT);

export default {
    getPasswordHash,
};
