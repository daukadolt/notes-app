import User from '../models/User.model';

const createNewUser = async ({ username, password }) => {
    const newUser = User.build({ username, password });
    await newUser.validate();
    await newUser.save();
};

const getUserByUsername = async (username) => User.findOne({ where: { username } });

export default {
    createNewUser,
    getUserByUsername,
};
