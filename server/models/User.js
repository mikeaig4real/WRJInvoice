const bcrypt = require('bcryptjs');

const randomString = require('randomString');

const moment = require('moment-timezone');

const {
    updateMany,
    deleteMany,
    aggregateData,
    insertMany,
    findAndUpdateData,
} = require('../dbInstance').getDB();

const {
    createJWT,
    isTokenValid,
    createTokenUser,
} = require('../utils');

const {
    USERS,
} = require('../db/collections');


const create = async ({ firstName, lastName, password, email }) => {

    if (!firstName || !lastName || !password || !email) throw new Error('Missing required fields to create user');

    try {

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const fullName = `${firstName} ${lastName}`;

        const currentDate = moment().toDate();

        const preUser = {
            firstName,
            lastName,
            email,
            userId: randomString.generate(24),
            fullName,
            password: hashedPassword,
            createdAt: currentDate,
            updatedAt: currentDate,
        };

        preUser.token = createJWT({ payload: createTokenUser(preUser), expiresIn: '24h' });

        await insertMany(USERS, [preUser]);

        const { password: pass, ...user } = preUser;

        return ({
            error: false,
            result: user
        });


    } catch (error) {

        throw new Error(error);

    }
};

const find = async ({ filterBy }) => {

    if (!filterBy) throw new Error('filterBy is required for a find');

    try {
        const agg = [
            {
                $match: filterBy,
            }
        ];

        const { result } = await aggregateData(USERS, agg);

        return {
            error: false,
            result: result.length <= 1 ? result[0] : result
        };

    } catch (error) {

        throw new Error(error);

    }
};

const update = async ({ filterBy, update, options = {} }) => {

    if (!filterBy || !update || !Object.keys(update)) throw new Error('filterBy and update with valid key is required');

    try {

        await updateMany(USERS, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

        return {
            error: false,
            result: update,
        };

    } catch (error) {

        throw new Error(error);

    }

};

const findUpdate = async ({ filterBy, update, options = {} }) => {

    if (!filterBy || !update || !Object.keys(update)) throw new Error('filterBy and update with valid key is required');

    try {

        const { result: { value: { password, token, ...user } } } = await findAndUpdateData(USERS, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

        return {
            error: false,
            result: user,
        };

    } catch (error) {

        throw new Error(error);

    }

}


module.exports = {
    create,
    find,
    update,
    findUpdate,
}