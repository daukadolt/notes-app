import User from '../models/User.model';

const getUserByUsername = async (username) => User.findOne({ where: { username } });

export default {
    getUserByUsername,
};
