import User from '../models/User.model';

const getUserByUsername = async (username) => {
    return User.findOne({ where: { username } });
};

export default {
    getUserByUsername,
}
