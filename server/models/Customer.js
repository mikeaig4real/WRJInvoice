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
    CUSTOMERS,
} = require('../db/collections');


const create = async ({ firstName, lastName, phone, email, userId, address }) => {

    if (!firstName || !lastName || !phone || !email || !userId || !address) throw new Error('Missing required fields to create customer');

    try {

        const fullName = `${firstName} ${lastName}`;

        const currentDate = moment().toDate();

        const preCustomer = {
            firstName,
            lastName,
            email,
            customerId: randomString.generate(24),
            userId,
            fullName,
            address,
            phone,
            createdAt: currentDate,
            updatedAt: currentDate,
        };

        await insertMany(CUSTOMERS, [preCustomer]);

        const { userId: Id, ...customer } = preCustomer;

        return ({
            error: false,
            result: customer
        });


    } catch (error) {

        throw new Error(error);

    }
};

const find = async ({ filterBy, selectBy, sortBy, type = 'one', limit = 10, page = 1, skip = (+page - 1) * (+limit) }) => {

    if (!filterBy) throw new Error('filterBy is required for a find');

    try {
        
        const agg = [
            {
                $match: filterBy,
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: +limit
            }
        ];

        const { result } = await aggregateData(CUSTOMERS, agg);

        return {
            error: false,
            result: type === 'one' ? result[0] : result,
        };

    } catch (error) {

        throw new Error(error);

    }
};

const update = async ({ filterBy, update, options = {} }) => {

    if (!filterBy || !update || !Object.keys(update)) throw new Error('filterBy and update with valid key is required');

    try {

        await updateMany(CUSTOMERS, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

        return {
            error: false,
            result: update,
        };

    } catch (error) {

        throw new Error(error);

    }

};

const deleteOne = async ({ filterBy }) => {

    if (!filterBy) throw new Error('filterBy is required');

    try {

        const { result } = await deleteMany(CUSTOMERS, filterBy);

        return {
            error: false,
            result,
        };

    } catch (error) {

        throw new Error(error);

    }

};

const findUpdate = async ({ filterBy, update, options = {} }) => {

    if (!filterBy || !update || !Object.keys(update)) throw new Error('filterBy and update with valid key is required');

    try {

        const { result: { value: { userId, ...customer } } } = await findAndUpdateData(CUSTOMERS, filterBy, { $set: { ...update, updatedAt: moment().toDate() } }, options);

        return {
            error: false,
            result: customer,
        };

    } catch (error) {

        throw new Error(error);

    }

};


module.exports = {
    create,
    find,
    update,
    findUpdate,
    deleteOne,
}