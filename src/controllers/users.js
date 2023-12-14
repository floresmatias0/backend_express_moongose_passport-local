const User = require("../models/user");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const findAllUsers = async (filters) => {
    try {
        return await User.find(filters);
    }catch(err) {
        throw new Error(err.message);
    }
};

const findUserById = async (userId) => {
    try {
        if(userId && mongoose.Types.ObjectId.isValid(userId)) {
            const user = await User.findOne({_id: userId});
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
    } catch (err) {
        console.log({err})

        throw new Error('Error fetching user by ID');
    }
};

const findUserByUsername = async (username) => {
    try {
        if(username) {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
    } catch (err) {
        throw new Error('Error fetching user by username');
    }
};

const findUserByEmail = async (userEmail) => {
    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }catch(err) {
        throw new Error(err.message);
    }
};

const createUser = async (userData) => {
    try {
        const saltRounds = 10;
        const { name, email, role, username, password } = userData;
        const passHashed = bcrypt.hashSync(password, saltRounds);

        return await User.create({
            name,
            username,
            email,
            password: passHashed,
            role
        });
    }catch(err) {
        throw new Error(err.message);
    }
}

const updateUser = async (id, userData) => {
    try {
        const { password } = userData
        if(password) {
            const saltRounds = 10;
            const passHashed = bcrypt.hashSync(password, saltRounds);
            userData = {...userData, password: passHashed}
        }
        return await User.findOneAndUpdate({ _id: id }, userData);
    }catch(err) {
        throw new Error(err.message);
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByEmail,
    createUser,
    updateUser
};